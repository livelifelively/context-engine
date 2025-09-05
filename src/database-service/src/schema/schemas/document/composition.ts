/**
 * Document Composition Configuration
 *
 * This file defines how documents compose from families and sections.
 * It serves as the single source of truth for:
 * - Which families each document type includes
 * - Which sections each document type includes
 * - Document-specific relationships and configurations
 *
 * This centralized approach makes it easy to:
 * - Add/remove families or sections from document types
 * - Change composition rules without touching individual document files
 * - Trigger regeneration when composition changes
 */

import { family_1_meta_governance } from './families/1-meta-governance/family-1-meta-governance.js';
import { section_1_1_status } from './families/1-meta-governance/sections/1.1-status.js';
import { section_1_2_priority_drivers } from './families/1-meta-governance/sections/1.2-priority-drivers.js';
import { section_1_3_history } from './families/1-meta-governance/sections/1.3-history.js';

import { family_2_business_scope } from './families/2-business-scope/family-2-business-scope.js';
import { section_2_1_overview } from './families/2-business-scope/sections/2.1-overview.js';
import { section_2_2_business_context } from './families/2-business-scope/sections/2.2-business-context.js';
import { section_2_2_1_user_personas } from './families/2-business-scope/sections/2.2.1-user-personas.js';
import { section_2_2_2_business_rules } from './families/2-business-scope/sections/2.2.2-business-rules.js';
import { section_2_2_3_user_stories } from './families/2-business-scope/sections/2.2.3-user-stories.js';
import { section_2_2_4_user_journeys } from './families/2-business-scope/sections/2.2.4-user-journeys.js';
import { section_2_3_success_criteria } from './families/2-business-scope/sections/2.3-success-criteria.js';
import { section_2_4_definition_of_done } from './families/2-business-scope/sections/2.4-definition-of-done.js';
import { section_2_5_boundaries_scope } from './families/2-business-scope/sections/2.5-boundaries-scope.js';
import { section_2_6_core_business_processes } from './families/2-business-scope/sections/2.6-core-business-processes.js';

import { family_3_planning_decomposition } from './families/3-planning-decomposition/family-3-planning-decomposition.js';
import { section_3_1_roadmap } from './families/3-planning-decomposition/sections/3.1-roadmap.js';
import { section_3_2_backlog_icebox } from './families/3-planning-decomposition/sections/3.2-backlog-icebox.js';
import { section_3_3_dependencies } from './families/3-planning-decomposition/sections/3.3-dependencies.js';
import { section_3_4_decomposition_graph } from './families/3-planning-decomposition/sections/3.4-decomposition-graph.js';

import { family_4_current_architecture } from './families/4-current-architecture/family-4-current-architecture.js';
import { section_4_1_guiding_principles } from './families/4-current-architecture/sections/4.1-guiding-principles.js';
import { section_4_2_data_models } from './families/4-current-architecture/sections/4.2-data-models.js';
import { section_4_3_components } from './families/4-current-architecture/sections/4.3-components.js';
import { section_4_4_data_flow } from './families/4-current-architecture/sections/4.4-data-flow.js';
import { section_4_5_control_flow } from './families/4-current-architecture/sections/4.5-control-flow.js';
import { section_4_6_integration_points } from './families/4-current-architecture/sections/4.6-integration-points.js';
import { section_4_6_1_upstream_integrations } from './families/4-current-architecture/sections/4.6.1-upstream-integrations.js';
import { section_4_6_2_downstream_integrations } from './families/4-current-architecture/sections/4.6.2-downstream-integrations.js';

import { family_5_target_architecture } from './families/5-target-architecture/family-5-target-architecture.js';
import { section_5_1_guiding_principles } from './families/5-target-architecture/sections/5.1-guiding-principles.js';
import { section_5_2_data_models } from './families/5-target-architecture/sections/5.2-data-models.js';
import { section_5_3_components } from './families/5-target-architecture/sections/5.3-components.js';
import { section_5_4_data_flow } from './families/5-target-architecture/sections/5.4-data-flow.js';
import { section_5_5_control_flow } from './families/5-target-architecture/sections/5.5-control-flow.js';
import { section_5_6_integration_points } from './families/5-target-architecture/sections/5.6-integration-points.js';
import { section_5_6_1_upstream_integrations } from './families/5-target-architecture/sections/5.6.1-upstream-integrations.js';
import { section_5_6_2_downstream_integrations } from './families/5-target-architecture/sections/5.6.2-downstream-integrations.js';

import { family_6_current_maintenance_monitoring } from './families/6-current-maintenance-monitoring/family-6-current-maintenance-monitoring.js';
import { section_6_1_error_handling } from './families/6-current-maintenance-monitoring/sections/6.1-error-handling.js';
import { section_6_2_logging_monitoring } from './families/6-current-maintenance-monitoring/sections/6.2-logging-monitoring.js';

import { family_7_target_maintenance_monitoring } from './families/7-target-maintenance-monitoring/family-7-target-maintenance-monitoring.js';
import { section_7_1_error_handling } from './families/7-target-maintenance-monitoring/sections/7.1-error-handling.js';
import { section_7_2_logging_monitoring } from './families/7-target-maintenance-monitoring/sections/7.2-logging-monitoring.js';

import { family_8_implementation_guidance } from './families/8-implementation-guidance/family-8-implementation-guidance.js';
import { section_8_1_implementation_plan } from './families/8-implementation-guidance/sections/8.1-implementation-plan.js';
import { section_8_2_initial_situation } from './families/8-implementation-guidance/sections/8.2-initial-situation.js';
import { section_8_3_files_change_log } from './families/8-implementation-guidance/sections/8.3-files-change-log.js';
import { section_8_4_prompts } from './families/8-implementation-guidance/sections/8.4-prompts.js';

import { family_9_quality_standards_operations } from './families/9-quality-operations/family-9-quality-operations.js';
import { section_9_1_configuration } from './families/9-quality-operations/sections/9.1-configuration.js';
import { section_9_2_alert_conditions } from './families/9-quality-operations/sections/9.2-alert-conditions.js';
import { section_9_3_consumer_response_strategies } from './families/9-quality-operations/sections/9.3-consumer-response-strategies.js';
import { section_9_4_error_recovery } from './families/9-quality-operations/sections/9.4-error-recovery.js';
import { section_9_5_deployment_steps } from './families/9-quality-operations/sections/9.5-deployment-steps.js';

import { family_10_current_testing_quality } from './families/10-current-testing-quality/family-10-current-testing-quality.js';
import { section_10_1_current_testing_strategy } from './families/10-current-testing-quality/sections/10.1-current-testing-strategy.js';
import { section_10_2_current_test_coverage } from './families/10-current-testing-quality/sections/10.2-current-test-coverage.js';
import { section_10_3_current_quality_metrics } from './families/10-current-testing-quality/sections/10.3-current-quality-metrics.js';
import { section_10_4_current_testing_tools } from './families/10-current-testing-quality/sections/10.4-current-testing-tools.js';

import { family_11_target_testing_quality } from './families/11-target-testing-quality/family-11-target-testing-quality.js';
import { section_11_1_target_testing_strategy } from './families/11-target-testing-quality/sections/11.1-target-testing-strategy.js';
import { section_11_2_target_test_coverage } from './families/11-target-testing-quality/sections/11.2-target-test-coverage.js';
import { section_11_3_target_quality_metrics } from './families/11-target-testing-quality/sections/11.3-target-quality-metrics.js';
import { section_11_4_target_testing_tools } from './families/11-target-testing-quality/sections/11.4-target-testing-tools.js';

import { family_12_reference } from './families/12-reference/family-12-reference.js';
import { section_12_1_appendices_glossary } from './families/12-reference/sections/12.1-appendices-glossary.js';

export const DOCUMENT_COMPOSITION: Record<string, any> = {
  // =============================================================================
  // PLAN DOCUMENT COMPOSITION
  // =============================================================================

  Plan: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_1_status, section_1_2_priority_drivers],
    },
    {
      name: 'businessScope',
      family: family_2_business_scope,
      sections: [
        section_2_1_overview,
        section_2_2_business_context,
        section_2_2_1_user_personas,
        section_2_2_2_business_rules,
        section_2_2_3_user_stories,
        section_2_2_4_user_journeys,
        section_2_3_success_criteria,
        section_2_5_boundaries_scope,
        section_2_6_core_business_processes,
      ],
    },
    {
      name: 'planningDecomposition',
      family: family_3_planning_decomposition,
      sections: [
        section_3_1_roadmap,
        section_3_2_backlog_icebox,
        section_3_3_dependencies,
        section_3_4_decomposition_graph,
      ],
    },
    {
      name: 'currentArchitecture',
      family: family_4_current_architecture,
      sections: [
        section_4_1_guiding_principles,
        section_4_2_data_models,
        section_4_3_components,
        section_4_4_data_flow,
        section_4_5_control_flow,
        section_4_6_integration_points,
        section_4_6_1_upstream_integrations,
        section_4_6_2_downstream_integrations,
      ],
    },
    {
      name: 'targetArchitecture',
      family: family_5_target_architecture,
      sections: [
        section_5_1_guiding_principles,
        section_5_2_data_models,
        section_5_3_components,
        section_5_4_data_flow,
        section_5_5_control_flow,
        section_5_6_integration_points,
        section_5_6_1_upstream_integrations,
        section_5_6_2_downstream_integrations,
      ],
    },
    {
      name: 'currentMaintenanceMonitoring',
      family: family_6_current_maintenance_monitoring,
      sections: [section_6_1_error_handling, section_6_2_logging_monitoring],
    },
    {
      name: 'targetMaintenanceMonitoring',
      family: family_7_target_maintenance_monitoring,
      sections: [section_7_1_error_handling, section_7_2_logging_monitoring],
    },
    {
      name: 'implementationGuidance',
      family: family_8_implementation_guidance,
      sections: [section_8_1_implementation_plan, section_8_4_prompts],
    },
    {
      name: 'qualityStandardsOperations',
      family: family_9_quality_standards_operations,
      sections: [
        section_9_1_configuration,
        section_9_2_alert_conditions,
        section_9_3_consumer_response_strategies,
        section_9_4_error_recovery,
        section_9_5_deployment_steps,
      ],
    },
    {
      name: 'currentTestingQuality',
      family: family_10_current_testing_quality,
      sections: [
        section_10_1_current_testing_strategy,
        section_10_2_current_test_coverage,
        section_10_3_current_quality_metrics,
        section_10_4_current_testing_tools,
      ],
    },
    {
      name: 'targetTestingQuality',
      family: family_11_target_testing_quality,
      sections: [
        section_11_1_target_testing_strategy,
        section_11_2_target_test_coverage,
        section_11_3_target_quality_metrics,
        section_11_4_target_testing_tools,
      ],
    },
    {
      name: 'reference',
      family: family_12_reference,
      sections: [section_12_1_appendices_glossary],
    },
  ],

  // =============================================================================
  // TASK DOCUMENT COMPOSITION
  // =============================================================================

  Task: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_2_priority_drivers],
    },
    {
      name: 'businessScope',
      family: family_2_business_scope,
      sections: [section_2_1_overview, section_2_4_definition_of_done],
    },
    {
      name: 'planningDecomposition',
      family: family_3_planning_decomposition,
      sections: [section_3_3_dependencies],
    },
    {
      name: 'targetArchitecture',
      family: family_5_target_architecture,
      sections: [
        section_5_1_guiding_principles,
        section_5_2_data_models,
        section_5_3_components,
        section_5_4_data_flow,
        section_5_5_control_flow,
        section_5_6_integration_points,
        section_5_6_1_upstream_integrations,
        section_5_6_2_downstream_integrations,
      ],
    },
    {
      name: 'targetMaintenanceMonitoring',
      family: family_7_target_maintenance_monitoring,
      sections: [section_7_1_error_handling, section_7_2_logging_monitoring],
    },
    {
      name: 'implementationGuidance',
      family: family_8_implementation_guidance,
      sections: [
        section_8_1_implementation_plan,
        section_8_2_initial_situation,
        section_8_3_files_change_log,
        section_8_4_prompts,
      ],
    },
    {
      name: 'qualityStandardsOperations',
      family: family_9_quality_standards_operations,
      sections: [
        section_9_1_configuration,
        section_9_2_alert_conditions,
        section_9_3_consumer_response_strategies,
        section_9_4_error_recovery,
      ],
    },
    {
      name: 'currentTestingQuality',
      family: family_10_current_testing_quality,
      sections: [
        section_10_1_current_testing_strategy,
        section_10_2_current_test_coverage,
        section_10_3_current_quality_metrics,
        section_10_4_current_testing_tools,
      ],
    },
    {
      name: 'targetTestingQuality',
      family: family_11_target_testing_quality,
      sections: [
        section_11_1_target_testing_strategy,
        section_11_2_target_test_coverage,
        section_11_3_target_quality_metrics,
        section_11_4_target_testing_tools,
      ],
    },
    {
      name: 'reference',
      family: family_12_reference,
      sections: [section_12_1_appendices_glossary],
    },
  ],

  // =============================================================================
  // PROJECT DOCUMENT COMPOSITION
  // =============================================================================

  Project: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
    {
      name: 'currentArchitecture',
      family: family_4_current_architecture,
      sections: [
        section_4_1_guiding_principles,
        section_4_2_data_models,
        section_4_3_components,
        section_4_4_data_flow,
        section_4_5_control_flow,
        section_4_6_integration_points,
        section_4_6_1_upstream_integrations,
        section_4_6_2_downstream_integrations,
      ],
    },
    {
      name: 'targetArchitecture',
      family: family_5_target_architecture,
      sections: [
        section_5_1_guiding_principles,
        section_5_2_data_models,
        section_5_3_components,
        section_5_4_data_flow,
        section_5_5_control_flow,
        section_5_6_integration_points,
        section_5_6_1_upstream_integrations,
        section_5_6_2_downstream_integrations,
      ],
    },
    {
      name: 'currentMaintenanceMonitoring',
      family: family_6_current_maintenance_monitoring,
      sections: [section_6_1_error_handling, section_6_2_logging_monitoring],
    },
    {
      name: 'targetMaintenanceMonitoring',
      family: family_7_target_maintenance_monitoring,
      sections: [section_7_1_error_handling, section_7_2_logging_monitoring],
    },
  ],

  // =============================================================================
  // MODULE DOCUMENT COMPOSITION
  // =============================================================================

  Module: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
    {
      name: 'currentArchitecture',
      family: family_4_current_architecture,
      sections: [
        section_4_1_guiding_principles,
        section_4_2_data_models,
        section_4_3_components,
        section_4_4_data_flow,
        section_4_5_control_flow,
        section_4_6_integration_points,
        section_4_6_1_upstream_integrations,
        section_4_6_2_downstream_integrations,
      ],
    },
    {
      name: 'targetArchitecture',
      family: family_5_target_architecture,
      sections: [
        section_5_1_guiding_principles,
        section_5_2_data_models,
        section_5_3_components,
        section_5_4_data_flow,
        section_5_5_control_flow,
        section_5_6_integration_points,
        section_5_6_1_upstream_integrations,
        section_5_6_2_downstream_integrations,
      ],
    },
    {
      name: 'currentMaintenanceMonitoring',
      family: family_6_current_maintenance_monitoring,
      sections: [section_6_1_error_handling, section_6_2_logging_monitoring],
    },
    {
      name: 'targetMaintenanceMonitoring',
      family: family_7_target_maintenance_monitoring,
      sections: [section_7_1_error_handling, section_7_2_logging_monitoring],
    },
  ],

  // =============================================================================
  // FEATURE DOCUMENT COMPOSITION
  // =============================================================================

  Feature: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
    {
      name: 'currentArchitecture',
      family: family_4_current_architecture,
      sections: [
        section_4_1_guiding_principles,
        section_4_2_data_models,
        section_4_3_components,
        section_4_4_data_flow,
        section_4_5_control_flow,
        section_4_6_integration_points,
        section_4_6_1_upstream_integrations,
        section_4_6_2_downstream_integrations,
      ],
    },
    {
      name: 'targetArchitecture',
      family: family_5_target_architecture,
      sections: [
        section_5_1_guiding_principles,
        section_5_2_data_models,
        section_5_3_components,
        section_5_4_data_flow,
        section_5_5_control_flow,
        section_5_6_integration_points,
        section_5_6_1_upstream_integrations,
        section_5_6_2_downstream_integrations,
      ],
    },
    {
      name: 'currentMaintenanceMonitoring',
      family: family_6_current_maintenance_monitoring,
      sections: [section_6_1_error_handling, section_6_2_logging_monitoring],
    },
    {
      name: 'targetMaintenanceMonitoring',
      family: family_7_target_maintenance_monitoring,
      sections: [section_7_1_error_handling, section_7_2_logging_monitoring],
    },
  ],
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type DocumentType = keyof typeof DOCUMENT_COMPOSITION;
export type DocumentComposition = (typeof DOCUMENT_COMPOSITION)[DocumentType];
export type FamilyComposition = {
  name: string;
  family: any; // Reference to family data object
  sections: any[]; // Array of section data objects
};
