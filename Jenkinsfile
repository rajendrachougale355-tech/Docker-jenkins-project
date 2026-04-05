pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/my_project01.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my_project01:latest")
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'echo "No tests yet, add Mocha/Jest here"'
            }
        }

        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                    echo $PASS | docker login -u $USER --password-stdin
                    docker tag my_project01:latest yourdockerhub/my_project01:latest
                    docker push yourdockerhub/my_project01:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down && docker compose up -d'
            }
        }
    }
}
