pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/rajendrachougale355-tech/Docker-jenkins-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my_project01:latest .'
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
                    docker tag my_project01:latest rajchouugale/my_project01:latest
                    docker push rajchouugale/my_project01:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Clean up old containers to avoid name conflicts
                docker rm -f my_project-database || true
                docker rm -f my_project-web-app || true

                # Bring down old stack if running
                docker compose down || true

                # Start fresh stack
                docker compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
