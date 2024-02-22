#!/usr/bin/env node
import 'source-map-support/register';
require('dotenv').config();

import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { ComputeStack } from '../lib/compute-stack';
import { DatabaseStack } from '../lib/database-stack';
//import { SGStack } from '../lib/sg-stack';
//import { RolesStack } from '../lib/roles-stack';
//import { SecretsStack } from '../lib/secrets-stack';

const app = new cdk.App();

const Vpc = new VpcStack(app, 'VpcStack');
//const Roles = new RolesStack(app, 'RolesStack');
//const Secrets = new SecretsStack(app, 'SecretsStack', { role: Roles.FargateRole });
//const SGs = new SGStack(app, 'SGStack', { vpc: Vpc.VPC });

const Compute = new ComputeStack(app, 'ComputeStack', {
  vpc: Vpc.VPC
  //dbSecret: Secrets.DbSecret,
  //role: Roles.FargateRole
  //securityGroupFargate: SGs.SecurityGroupFargate
});

new DatabaseStack(app, 'DatabaseStack', {
  vpc: Vpc.VPC
  //dbSecret: Secrets.DbSecret,
  //securityGroupFargate: SGs.SecurityGroupFargate
});
