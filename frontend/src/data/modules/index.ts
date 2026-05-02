import { emailAnalysisModule } from './emailAnalysis';
import { passwordSecurityModule } from './passwordSecurity';
import { malwareAwarenessModule } from './malwareAwareness';
import { urlAnalysisModule } from './urlAnalysis';
import { socialEngineeringModule } from './socialEngineering';
import { ransomwareDefenseModule } from './ransomwareDefense';
import { insiderThreatModule } from './insiderThreat';
import { physicalSecurityModule } from './physicalSecurity';
import { wifiSecurityModule } from './wifiSecurity';
import { deviceSecurityModule } from './deviceSecurity';
import { cloudSecurityModule } from './cloudSecurity';
import { mfaAuthenticationModule } from './mfaAuthentication';
import { dataClassificationModule } from './dataClassification';
import { incidentResponseModule } from './incidentResponse';
import { privacyAwarenessModule } from './privacyAwareness';
import { aiDeepfakeRisksModule } from './aiDeepfakeRisks';
import { simulatedAttackCallsModule } from './simulatedAttackCalls';
import { digitalFootprintOsintModule } from './digitalFootprintOsint';
import { safeBrowsingModule } from './safeBrowsing';
import { supplyChainRiskModule } from './supplyChainRisk';
import type { SimulationModuleDef } from './types';

export const modulesRegistry: Record<string, SimulationModuleDef> = {
  [emailAnalysisModule.id]: emailAnalysisModule,
  [passwordSecurityModule.id]: passwordSecurityModule,
  [malwareAwarenessModule.id]: malwareAwarenessModule,
  [urlAnalysisModule.id]: urlAnalysisModule,
  [socialEngineeringModule.id]: socialEngineeringModule,
  [ransomwareDefenseModule.id]: ransomwareDefenseModule,
  [insiderThreatModule.id]: insiderThreatModule,
  [physicalSecurityModule.id]: physicalSecurityModule,
  [wifiSecurityModule.id]: wifiSecurityModule,
  [deviceSecurityModule.id]: deviceSecurityModule,
  [cloudSecurityModule.id]: cloudSecurityModule,
  [mfaAuthenticationModule.id]: mfaAuthenticationModule,
  [dataClassificationModule.id]: dataClassificationModule,
  [incidentResponseModule.id]: incidentResponseModule,
  [privacyAwarenessModule.id]: privacyAwarenessModule,
  [aiDeepfakeRisksModule.id]: aiDeepfakeRisksModule,
  [simulatedAttackCallsModule.id]: simulatedAttackCallsModule,
  [digitalFootprintOsintModule.id]: digitalFootprintOsintModule,
  [safeBrowsingModule.id]: safeBrowsingModule,
  [supplyChainRiskModule.id]: supplyChainRiskModule,
};

export const getModuleConfig = (moduleId: string): SimulationModuleDef | undefined => {
  return modulesRegistry[moduleId];
};

export type { SimulationModuleDef, QuestionDef } from './types';
