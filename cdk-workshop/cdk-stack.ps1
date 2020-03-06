Cdk init –language csharp #creates empty construct  library

cdk synth # CDK Apps define the infrasture, but must be "assembled" or synthesized into a cloudformation template 

cdk bootstrap # The stack needs to have somewhere to deploy, so by running the bootstap command it creates the necessary resources to deploy

cdk deploy # As it states in the name this will take your current stack and deploy using CloudFormation