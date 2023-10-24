<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ods', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('appointment_id');

            $table->json('lines')->nullable();

            $table->string('posture_option', 63)->nullable();
            $table->string('posture_dyn', 63)->nullable();
            $table->string('posture_note', 63)->nullable();

            $table->string('head_option', 63)->nullable();
            $table->string('head_dyn', 63)->nullable();
            $table->string('head_note', 63)->nullable();

            $table->string('shoulder_asymmetry_option', 63)->nullable();
            $table->string('shoulder_asymmetry_dyn', 63)->nullable();
            $table->string('shoulder_asymmetry_note', 63)->nullable();

            $table->string('blades_asymmetry_option', 63)->nullable();
            $table->string('blades_asymmetry_dyn', 63)->nullable();
            $table->string('blades_asymmetry_note', 63)->nullable();

            $table->string('pterygoid_scapulae_option', 63)->nullable();
            $table->string('pterygoid_scapulae_dyn', 63)->nullable();
            $table->string('pterygoid_scapulae_note', 63)->nullable();

            $table->string('increased_cervical_lordosis_option', 63)->nullable();
            $table->string('increased_cervical_lordosis_dyn', 63)->nullable();
            $table->string('increased_cervical_lordosis_note', 63)->nullable();

            $table->string('smoothing_cervical_lordosis_option', 63)->nullable();
            $table->string('smoothing_cervical_lordosis_dyn', 63)->nullable();
            $table->string('smoothing_cervical_lordosis_note', 63)->nullable();

            $table->string('increased_thoracic_kyphosis_option', 63)->nullable();
            $table->string('increased_thoracic_kyphosis_dyn', 63)->nullable();
            $table->string('increased_thoracic_kyphosis_note', 63)->nullable();

            $table->string('smoothing_thoracic_kyphosis_option', 63)->nullable();
            $table->string('smoothing_thoracic_kyphosis_dyn', 63)->nullable();
            $table->string('smoothing_thoracic_kyphosis_note', 63)->nullable();

            $table->string('increased_lumbar_lordosis_option', 63)->nullable();
            $table->string('increased_lumbar_lordosis_dyn', 63)->nullable();
            $table->string('increased_lumbar_lordosis_note', 63)->nullable();

            $table->string('smoothing_lumbar_lordosis_option', 63)->nullable();
            $table->string('smoothing_lumbar_lordosis_dyn', 63)->nullable();
            $table->string('smoothing_lumbar_lordosis_note', 63)->nullable();

            $table->string('waist_triangles_asymmetry_option', 63)->nullable();
            $table->string('waist_triangles_asymmetry_dyn', 63)->nullable();
            $table->string('waist_triangles_asymmetry_note', 63)->nullable();

            $table->string('muscle_ridges_back_asymmetry_option', 63)->nullable();
            $table->string('muscle_ridges_back_asymmetry_dyn', 63)->nullable();
            $table->string('muscle_ridges_back_asymmetry_note', 63)->nullable();

            $table->string('rib_hump_back_option', 63)->nullable();
            $table->string('rib_hump_back_dyn', 63)->nullable();
            $table->string('rib_hump_back_note', 63)->nullable();

            $table->string('popliteal_folds_asymmetry_option', 63)->nullable();
            $table->string('popliteal_folds_asymmetry_dyn', 63)->nullable();
            $table->string('popliteal_folds_asymmetry_note', 63)->nullable();

            $table->string('gluteal_folds_asymmetry_option', 63)->nullable();
            $table->string('gluteal_folds_asymmetry_dyn', 63)->nullable();
            $table->string('gluteal_folds_asymmetry_note', 63)->nullable();

            $table->string('axial_rotation_hull_option', 63)->nullable();
            $table->string('axial_rotation_hull_dyn', 63)->nullable();
            $table->string('axial_rotation_hull_note', 63)->nullable();

            $table->string('axial_rotation_pelvis_option', 63)->nullable();
            $table->string('axial_rotation_pelvis_dyn', 63)->nullable();
            $table->string('axial_rotation_pelvis_note', 63)->nullable();

            $table->string('sitting_pelvic_tilt_option', 63)->nullable();
            $table->string('sitting_pelvic_tilt_dyn', 63)->nullable();
            $table->string('sitting_pelvic_tilt_note', 63)->nullable();

            $table->string('sacral_fossae_option', 63)->nullable();
            $table->string('sacral_fossae_dyn', 63)->nullable();
            $table->string('sacral_fossae_note', 63)->nullable();

            $table->string('pelvic_tilt_option', 63)->nullable();
            $table->string('pelvic_tilt_dyn', 63)->nullable();
            $table->string('pelvic_tilt_note', 63)->nullable();

            $table->string('hull_asymmetry_option', 63)->nullable();
            $table->string('hull_asymmetry_dyn', 63)->nullable();
            $table->string('hull_asymmetry_note', 63)->nullable();

            $table->string('deviation_axis_lumbar_option', 63)->nullable();
            $table->string('deviation_axis_lumbar_dyn', 63)->nullable();
            $table->string('deviation_axis_lumbar_note', 63)->nullable();

            $table->string('deviation_axis_chest_option', 63)->nullable();
            $table->string('deviation_axis_chest_dyn', 63)->nullable();
            $table->string('deviation_axis_chest_note', 63)->nullable();

            $table->string('cervical_hypertonicity_right', 63)->nullable();
            $table->string('cervical_hypertonicity_left', 63)->nullable();
            $table->string('cervical_hypertonicity_right_dyn', 63)->nullable();
            $table->string('cervical_hypertonicity_left_dyn', 63)->nullable();
            $table->string('cervical_hypertonicity_note', 63)->nullable();

            $table->string('cervical_hypotonic_right', 63)->nullable();
            $table->string('cervical_hypotonic_left', 63)->nullable();
            $table->string('cervical_hypotonic_right_dyn', 63)->nullable();
            $table->string('cervical_hypotonic_left_dyn', 63)->nullable();
            $table->string('cervical_hypotonic_note', 63)->nullable();

            $table->string('cervical_skin_fold_option', 63)->nullable();
            $table->string('cervical_skin_fold_dyn', 63)->nullable();
            $table->string('cervical_skin_fold_note', 63)->nullable();

            $table->string('cervical_edema_option', 63)->nullable();
            $table->string('cervical_edema_dyn', 63)->nullable();
            $table->string('cervical_edema_note', 63)->nullable();

            $table->string('topchest_hypertonicity_right', 63)->nullable();
            $table->string('topchest_hypertonicity_left', 63)->nullable();
            $table->string('topchest_hypertonicity_right_dyn', 63)->nullable();
            $table->string('topchest_hypertonicity_left_dyn', 63)->nullable();
            $table->string('topchest_hypertonicity_note', 63)->nullable();

            $table->string('topchest_hypotonic_right', 63)->nullable();
            $table->string('topchest_hypotonic_left', 63)->nullable();
            $table->string('topchest_hypotonic_right_dyn', 63)->nullable();
            $table->string('topchest_hypotonic_left_dyn', 63)->nullable();
            $table->string('topchest_hypotonic_note', 63)->nullable();

            $table->string('chest_hypertonicity_right', 63)->nullable();
            $table->string('chest_hypertonicity_left', 63)->nullable();
            $table->string('chest_hypertonicity_right_dyn', 63)->nullable();
            $table->string('chest_hypertonicity_left_dyn', 63)->nullable();
            $table->string('chest_hypertonicity_note', 63)->nullable();

            $table->string('chest_hypotonic_right', 63)->nullable();
            $table->string('chest_hypotonic_left', 63)->nullable();
            $table->string('chest_hypotonic_right_dyn', 63)->nullable();
            $table->string('chest_hypotonic_left_dyn', 63)->nullable();
            $table->string('chest_hypotonic_dyn', 63)->nullable();
            $table->string('chest_hypotonic_note', 63)->nullable();

            $table->string('lumbar_hypertonicity_right', 63)->nullable();
            $table->string('lumbar_hypertonicity_left', 63)->nullable();
            $table->string('lumbar_hypertonicity_right_dyn', 63)->nullable();
            $table->string('lumbar_hypertonicity_left_dyn', 63)->nullable();
            $table->string('lumbar_hypertonicity_note', 63)->nullable();

            $table->string('lumbar_hypotonic_right', 63)->nullable();
            $table->string('lumbar_hypotonic_left', 63)->nullable();
            $table->string('lumbar_hypotonic_right_dyn', 63)->nullable();
            $table->string('lumbar_hypotonic_left_dyn', 63)->nullable();
            $table->string('lumbar_hypotonic_note', 63)->nullable();

            $table->string('lumbar_edema_option', 63)->nullable();
            $table->string('lumbar_edema_dyn', 63)->nullable();
            $table->string('lumbar_edema_note', 63)->nullable();

            $table->string('gluteal_hypertonicity_right', 63)->nullable();
            $table->string('gluteal_hypertonicity_left', 63)->nullable();
            $table->string('gluteal_hypertonicity_right_dyn', 63)->nullable();
            $table->string('gluteal_hypertonicity_left_dyn', 63)->nullable();
            $table->string('gluteal_hypertonicity_note', 63)->nullable();

            $table->string('gluteal_hypotonic_right', 63)->nullable();
            $table->string('gluteal_hypotonic_left', 63)->nullable();
            $table->string('gluteal_hypotonic_right_dyn', 63)->nullable();
            $table->string('gluteal_hypotonic_left_dyn', 63)->nullable();
            $table->string('gluteal_hypotonic_note', 63)->nullable();

            $table->string('calf_hypertonicity_right', 63)->nullable();
            $table->string('calf_hypertonicity_left', 63)->nullable();
            $table->string('calf_hypertonicity_right_dyn', 63)->nullable();
            $table->string('calf_hypertonicity_left_dyn', 63)->nullable();
            $table->string('calf_hypertonicity_note', 63)->nullable();

            $table->string('calf_hypotonic_right', 63)->nullable();
            $table->string('calf_hypotonic_left', 63)->nullable();
            $table->string('calf_hypotonic_right_dyn', 63)->nullable();
            $table->string('calf_hypotonic_left_dyn', 63)->nullable();
            $table->string('calf_hypotonic_note', 63)->nullable();

            $table->string('achilles_tendon_right', 63)->nullable();
            $table->string('achilles_tendon_left', 63)->nullable();
            $table->string('achilles_tendon_right_dyn', 63)->nullable();
            $table->string('achilles_tendon_left_dyn', 63)->nullable();
            $table->string('achilles_tendon_note', 63)->nullable();

            $table->string('chest_shoulder_asymmetry_right_higher', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_right_below', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_right_higher_dyn', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_right_below_dyn', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_right_note', 63)->nullable();

            $table->string('chest_shoulder_asymmetry_left_higher', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_left_below', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_left_higher_dyn', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_left_below_dyn', 63)->nullable();
            $table->string('chest_shoulder_asymmetry_left_note', 63)->nullable();

            $table->string('mammary_glands_asymmetry_right_higher', 63)->nullable();
            $table->string('mammary_glands_asymmetry_right_below', 63)->nullable();
            $table->string('mammary_glands_asymmetry_right_higher_dyn', 63)->nullable();
            $table->string('mammary_glands_asymmetry_right_below_dyn', 63)->nullable();
            $table->string('mammary_glands_asymmetry_right_note', 63)->nullable();

            $table->string('mammary_glands_asymmetry_left_higher', 63)->nullable();
            $table->string('mammary_glands_asymmetry_left_below', 63)->nullable();
            $table->string('mammary_glands_asymmetry_left_higher_dyn', 63)->nullable();
            $table->string('mammary_glands_asymmetry_left_below_dyn', 63)->nullable();
            $table->string('mammary_glands_asymmetry_left_note', 63)->nullable();

            $table->string('chest_deformity_option', 63)->nullable();
            $table->string('chest_deformity_dyn', 63)->nullable();
            $table->string('chest_deformity_note', 63)->nullable();

            $table->string('costal_arches_asymmetry_option', 63)->nullable();
            $table->string('costal_arches_asymmetry_dyn', 63)->nullable();
            $table->string('costal_arches_asymmetry_note', 63)->nullable();

            $table->string('deviation_umbilical_ring_option', 63)->nullable();
            $table->string('deviation_umbilical_ring_dyn', 63)->nullable();
            $table->string('deviation_umbilical_ring_note', 63)->nullable();

            $table->string('test_flexion_option', 63)->nullable();
            $table->string('test_flexion_dyn', 63)->nullable();
            $table->string('test_flexion_note', 63)->nullable();

            $table->string('test_extensional_option', 63)->nullable();
            $table->string('test_extensional_dyn', 63)->nullable();
            $table->string('test_extensional_note', 63)->nullable();

            $table->string('test_adams_option', 63)->nullable();
            $table->string('test_adams_note', 63)->nullable();
            $table->string('test_adams_dyn', 63)->nullable();

            $table->string('test_tredelen_option', 63)->nullable();
            $table->string('test_tredelen_note', 63)->nullable();
            $table->string('test_tredelen_dyn', 63)->nullable();

            $table->string('test_derbl_option', 63)->nullable();
            $table->string('test_derbl_note', 63)->nullable();
            $table->string('test_derbl_dyn', 63)->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ods');
    }
};
