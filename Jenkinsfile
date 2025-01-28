import com.i27academy.builds.Calculator
import com.i27academy.builds.Docker

def call(Map pipelineParams){
    Calculator calculator = new Calculator(this)
    Docker docker = new Docker(this)

    pipeline {
        agent {
            kubernetes {
                label 'k8s-slave'
            }
        }
        parameters {
            choice(name: 'dockerPush',
                choices: 'no\nyes',
                description: 'This Will build dockerImage and Push'
            )
            choice(name: 'deployToDev',
                choices: 'no\nyes',
                description: 'This Will deploy to Dev'
            )
            choice(name: 'deployToTest',
                choices: 'no\nyes',
                description: 'This Will deploy to Test'
            )
            choice(name: 'deployToStage',
                choices: 'no\nyes',
                description: 'This Will deploy to Stage'
            )
            choice(name: 'deployToProd',
                choices: 'no\nyes',
                description: 'This Will deploy to Prod'
            )
        }

        environment {
            APPLICATION_NAME = "${pipelineParams.appName ?: 'portfolio-app'}" // Default app name
            DOCKER_HUB = "docker.io/venky2222" // Replace with your Docker Hub username
            DOCKER_CREDS = credentials('dockerhub_creds') // Assuming you have Docker Hub credentials in Jenkins
            DEV_HOST_PORT = "30002"
            TST_HOST_PORT = "30003"
            STG_HOST_PORT = "30004"
            PRD_HOST_PORT = "30005"
            CONT_PORT = "80" // Changed to port 80 to match Dockerfile EXPOSE
            GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim() // Using short commit hash
            GIT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
        }
        stages {
            stage ('Docker Build and Push') {
                when {
                    anyOf {
                        expression {
                            params.dockerPush == 'yes'
                        }
                    }
                }
                steps {
                    script {
                        dockerBuildAndPush().call()
                    }
                }
            }
            stage ('Deploy to Dev') {
                when {
                    expression {
                        params.deployToDev == 'yes'
                    }
                }
                steps {
                    script {
                        imageValidation().call()
                        dockerDeploy('dev', "${env.DEV_HOST_PORT}", "${env.CONT_PORT}").call()
                        echo "Deployed to Dev Successfully"
                    }
                }
            }
            stage ('Deployed to Test') {
                when {
                    expression {
                        params.deployToTest == 'yes'
                    }
                }
                steps {
                    script {
                        imageValidation().call()
                        dockerDeploy('tst', "${env.TST_HOST_PORT}", "${env.CONT_PORT}").call()
                        echo "Deployed to Test Successfully"
                    }
                }
            }
            stage ('Deploy to Stage') {
                when {
                    allOf {
                        expression {
                            params.deployToStage == 'yes' &&
                            env.GIT_BRANCH ==~ /release\/.*/
                        }
                    }
                }
                steps {
                    script {
                        imageValidation().call()
                        dockerDeploy('stg', "${env.STG_HOST_PORT}", "${env.CONT_PORT}").call()
                        echo "Deployed to Stage Successfully"
                    }
                }
            }
            stage('Deploy to Prod') {
                when {
                    allOf {
                        expression {
                            params.deployToProd == 'yes' &&
                            env.GIT_BRANCH ==~ /v\d{1,2}\.\d{1,2}\.\d{1,2}/
                        }
                    }
                }
                steps {
                    script {
                        imageValidation().call()
                        dockerDeploy('prd', "${env.PRD_HOST_PORT}", "${env.CONT_PORT}").call()
                        echo "Deployed to Prod Successfully"
                    }
                }
            }
            stage('Deploy to Kubernetes') { // Added Kubernetes deployment stage
                when {
                    anyOf {
                        expression {
                            params.deployToDev == 'yes' || params.deployToTest == 'yes' || params.deployToStage == 'yes' || params.deployToProd == 'yes'
                        }
                    }
                }
                steps {
                    script {
                        kubernetesDeploy().call()
                        echo "Deployed to Kubernetes Successfully"
                    }
                }
            }
        }
    }
}


// Method for Docker build and Push
def dockerBuildAndPush(){
    return {
        echo "************************* Building Docker image*************************"
        sh "ls -la"
        sh "docker build --no-cache -t ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${env.GIT_COMMIT} ." // Changed build context to current directory
        echo "************************ Login to Docker Registry ************************"
        withCredentials([usernamePassword(credentialsId: 'dockerhub_creds', passwordVariable: 'DOCKER_CREDS_PSW', usernameVariable: 'DOCKER_CREDS_USR')]) {
            sh "docker login -u ${DOCKER_CREDS_USR} -p ${DOCKER_CREDS_PSW}"
            sh "docker push ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${env.GIT_COMMIT}"
        }
    }
}

def imageValidation() {
    return {
        println("Attemting to Pull the Docker Image")
        try {
            sh "docker pull ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${env.GIT_COMMIT}"
            println("Image is Pulled Succesfully!!!!")
        }
        catch(Exception e) {
            println("OOPS!, the docker image with this tag is not available,So Creating the Image")
            dockerBuildAndPush().call() // Removed buildApp().call() as it's not defined and seems unnecessary
        }
    }
}

def dockerDeploy(envDeploy, hostPort, contPort){
    return {
        echo "******************************** Deploying to $envDeploy Environment ********************************"
        script {
            echo "******************************** Pulling latest image ********************************"
            sh "docker pull ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${env.GIT_COMMIT}"

            try {
                echo "******************************** Stopping existing container ********************************"
                sh "docker stop ${env.APPLICATION_NAME}-$envDeploy"
                echo "******************************** Removing existing container ********************************"
                sh "docker rm ${env.APPLICATION_NAME}-$envDeploy"
            }
            catch(err) {
                echo "******************************** Error Caught: $err ********************************"
            }

            echo "******************************** Creating new container ********************************"
            sh """
                docker run -dit --name ${env.APPLICATION_NAME}-$envDeploy \\
                -p $hostPort:$contPort \\
                -e ENVIRONMENT=$envDeploy \\
                ${env.DOCKER_HUB}/${env.APPLICATION_NAME}:${env.GIT_COMMIT} \\
                nginx -g 'daemon off;' // Using nginx directly as CMD in Dockerfile
            """
        }
    }
}

def kubernetesDeploy() {
    return {
        echo "******************************** Deploying to Kubernetes ********************************"
        sh "kubectl apply -f k8s/deployment.yaml" // Assuming kubectl is configured and k8s directory exists
    }
}


call(pipelineParams)
