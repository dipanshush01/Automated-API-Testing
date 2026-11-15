pipeline {
    agent any
    tools {
        // Configure a NodeJS installation named NodeJS-20 in Jenkins.
        nodejs "NodeJS-20"
    }
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Start API and Run Newman Tests') {
            steps {
                bat 'start /B cmd /C "npm start"'
                bat 'timeout /t 5 /nobreak'
                bat 'npx newman run tests/postman_collection.json --env-var baseUrl=http://localhost:5000'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished. Review Newman output in the console.'
        }
    }
}
