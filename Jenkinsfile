
pipeline {
    agent any

    stages {
        stage('Checkout GitHub') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Start API Server') {
            steps {
                bat 'start "API Server" /B cmd /c "npm start"'
                bat 'timeout /t 10 /nobreak'
            }
        }

        stage('Run API Tests') {
            steps {
                bat 'if not exist reports mkdir reports'
                bat 'npm run test:api:report'
            }
        }

        stage('Archive HTML Report') {
            steps {
                archiveArtifacts artifacts: 'reports/api-test-report.html', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Pipeline completed!'
        }
        failure {
            echo 'FAILURE: Check Console Output'
        }
    }
}
