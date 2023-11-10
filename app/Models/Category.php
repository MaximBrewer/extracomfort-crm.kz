<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model implements \Bigperson\Exchange1C\Interfaces\GroupInterface
{
    use HasFactory, NodeTrait;

    public function getPrimaryKey()
    {
        return 'id';
    }

    public function accountingIds(): MorphMany
    {
        return $this->morphMany(AccountingId::class, 'entity');
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

        $xmlId = (string)$group->owner->classifier->xml->Ид;

        if ($parent = $group->getParent()) {
            $parentModel = self::createByML($parent);
            $parent_id = $parentModel->id;
            unset($parentModel);
        } else {
            $parent_id = null;
        }

        $slug = Str::slug($group->name);
        if (!$model = Category::whereHas('accountingIds', function (Builder $query) use ($group, $xmlId) {
            $query->where('accounting_id', $xmlId . '#' . $group->id);
        })->orWhere(function (Builder $query) use ($slug, $parent_id) {
            $query->where('slug', $slug)->where('parent_id', $parent_id);
        })->first()) {
            $model = new self;
        }

        $model->parent_id = $parent_id;
        $model->name = $group->name;
        $model->slug = $slug;
        $model->save();
        $model->accountingIds()->firstOrCreate(['accounting_id' =>  $xmlId . '#' . $group->id]);
        return $model;
    }
}
