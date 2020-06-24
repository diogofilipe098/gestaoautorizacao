pipeline {
   agent any

   stages {

       stage("Build container"){
            steps{
                bat 'docker build . -t diogofilipe7/gestaoautorizacao:latest'
            }
       }

       stage("Create and expose deployment throught loadBalancer"){
           steps{
                bat 'kubectl apply -f app_deployment.yaml'
           }
       }
   } 
}