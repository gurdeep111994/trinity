pipeline {
    agent any
    post {
        failure {
            emailext to: 'cristinaandreeaflorea3@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
    triggers{
        cron("H H(20-22) * * 0-5")
    }
    environment {
        docker_host = 'jenkins.ivfuture.internal:5000'
        service_group_name = 'trinity2'
        service_name = 'admin'
        }
    stages {
        stage('Build Master') {
            when {
                branch 'master'
            }
            steps {
                sh 'env'
                sh 'npm install'
                // sh 'cp settings.json.example settings.json'
                sh 'npm run build'
                sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=Trinity-v2-admin -Dsonar.sources=. -Dsonar.host.url=http://sonarqube.ivfuture.internal:9000 -Dsonar.login=6be384f7bf6bf54a02825a284b6e901a9671e131'
                sh 'docker build -t ${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER} .'
                sh 'docker tag ${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER} ${docker_host}/${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER}'
                sh 'docker push ${docker_host}/${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER}'
            }
        }
        stage('Build Dev') {
            when {
                branch 'dev'
            }
            environment {
                branch = 'dev'
            }
            steps {
                sh 'env'
                sh 'npm install'
                // sh 'cp settings.json.example settings.json'
                sh 'npm run build'
                // sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=Trinity-v2-admin -Dsonar.sources=. -Dsonar.host.url=http://sonarqube.ivfuture.internal:9000 -Dsonar.login=6be384f7bf6bf54a02825a284b6e901a9671e131'
                sh 'docker build -t ${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER} .'
                sh 'docker tag ${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER} ${docker_host}/${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER}'
                sh 'docker push ${docker_host}/${service_group_name}-${service_name}:${GIT_BRANCH}-${BUILD_NUMBER}'
            }
        }
    }
}