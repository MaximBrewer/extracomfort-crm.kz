<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model implements \Bigperson\Exchange1C\Interfaces\GroupInterface
{
    use HasFactory;

    public function getPrimaryKey()
    {
        return 'id';
    }

    /**
     * Возвращаем имя поля в базе данных, в котором хранится ID из 1с
     *
     * @return string
     */
    public static function getIdFieldName1c()
    {
        return 'accounting_id';
    }
    /**
     * Создание дерева групп
     * в параметр передаётся массив всех групп (import.xml > Классификатор > Группы)
     * $groups[0]->parent - родительская группа
     * $groups[0]->children - дочерние группы
     *
     * @param \Zenwalker\CommerceML\Model\Group[] $groups
     * @return void
     */
    public static function createTree1c($groups)
    {
        foreach ($groups as $group) {
            if ($group->name) {
                self::createByML($group);
                if ($children = $group->getChildren()) {
                    self::createTree1c($children);
                }
            }
        }
    }
    /**
     * Создаём группу по модели группы CommerceML
     * проверяем все дерево родителей группы, если родителя нет в базе - создаём
     *
     * @param \Zenwalker\CommerceML\Model\Group $group
     * @return Group|array|null
     */
    public static function createByML(\Zenwalker\CommerceML\Model\Group $group)
    {
        /**
         * @var \Zenwalker\CommerceML\Model\Group $parent
         */
        if (!$model = Category::where('accounting_id', $group->id)->first()) {
            $model = new self;
            $model->accounting_id = $group->id;
        }
        $model->name = $group->name;
        $model->slug = Str::slug($group->name);
        if ($parent = $group->getParent()) {
            $parentModel = self::createByML($parent);
            $model->parent_id = $parentModel->id;
            unset($parentModel);
        } else {
            $model->parent_id = null;
        }
        $model->save();
        return $model;
    }
}
