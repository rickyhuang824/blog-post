---
title: "Microservices Note"
date: "2023-04-22"
image: Microservices-Architecture.jpg
description: "Microservices are the number one solution for building and scaling out apps that are intended to grow.  Just one little issue: there are few resources online that delve into the most complex and nasty issues around them!"
isFeatured: true
---

# Microservices notes

This is a note for the Microservices knowledge

## Monolithic Server

![monolithic-server](monolithic-server.png)

## Event Bus

### what does event bus do?

![event-bus](event-bus.png)

- event buses are receiving events and publish them to the listeners

### dealing with missing events

![missing-events](missing-events.png)

- a service goes down in the middle

![missing-events-1.png](missing-events-1.png)

- did not create a service until later in the future, but already tons of events and data there in the previous existing services. how to get the new service added into sync ?

#### Solutions:

- <span style="color:red"> sync requests x</span>

  - make direct request between services to get all the missing data
  - cons:
    - falling back to synchronous requests
    - need to write some code inside of other services just to hanlde the new servince coming online
    - other service may not have api endpoint to grab all the data since the beginning

- <span style="color:red">Direct DB Access x</span>

  - give direct access to the other services' database
  - cons:
    - making sync requests over the database
    - difference service could have different kind of database

- <span style="color:green">Store events (the real world solution) </span>

  - have a event bus data store to store all the historical events
  - pros:

    - don't have to write extra code in other services or making direct request to other services
    - when bring a new service online, we can get access to all events occured in the past

  - the event bus data will grow really fast
  - ![missing-events-solution](missing-events-solution.png)

## Docker

- create a series of things called Containers
- A container is like an isolated computing environment, **A container is really a process or a set of processes that have a grouping of resoureces specifically assgined to it**

### Why Docker?

- Docker Containers wrap up everything that is needed for a program and how to start and run it
- it makes it really easy to install and run software without worrying about setup or dependencies

### What is Docker?

- ![docker-2](docker-2.png)
- ![docker-1](docker-1.png)
- ![kernel](kernel.png)
- ![docker-3](docker-3.png)
- ![docker-4](docker-4.png)
- ![docker-file](docker-file.png)

- ![docker](docker.png)

### Docker Commands:

- `docker run <image_name>`
- `docker run <image_name> <start command>`
- `docker ps` list the running containers`
- `docker ps --all` list all the ran and running containers
- `docker run = docker create + docker start` (prep the fs to the hard disk) + (run the start command in the container )
- `docker start -a <container ID>` start the container and watch for the outputs and print it to my terminal
- `docker system prune` remove all stopped containers, build cache (release the resourece on your computer)
- `docker logs <container ID>` get logs from the container
- `docker stop <container ID>` allow the process inside the container a little bit of time to shut itself down and do a little bit a clean up
- `docker kill <container ID>` kill the process imediately (not responding))
- `docker exec -it <container ID> <command>` execute an additional command in a container when the container is running (`it` means input text, -i allows us to have stuff that we type into our terminal directed into that running process and allow us to get information out back over to our terminal)
- `docker exec -it <container ID> sh` open up terminal shell inside of a running container
- `docker run -it <imageName> sh` create and run a container from the image and attach the stdin of it to the running shell
- `docker push <image name>` push image to the hub

### Docker File

#### creating a docker file

1. specify a base image
   - the purpose of specifying a base image is to kind of give us an initail starting point or an initial set of programmes to further customize our image
2. run some commands to install additional programs
3. specify a command to run on container startup

#### use Dockerfile to build the image:

- ```console
        docker build .
  ```

  returned the image id

- process when you build a docker image

  ![docker-file-3](docker-file-3.png)

- rebuilds with cache (change order of the instructions would result in rebuild without cache)

  ![docker-file-4](docker-file-4.png)

- Tagging an Image:

  ![docker-file-5](docker-file-5.png)

- Copying Building Files:

  ![docker-file-7](docker-file-7.png)

- WORKDIR:

  ![docker-file-9](docker-file-9.png)

- Minimziing Cache Busting and Rebuilds

  ```Dockerfile
    COPY ./package.json ./
    RUN npm install
    COPY ./ ./
  ```

  - so it woulld rebuild the dependencies from cache when there is only changes from source code and no changes in the package.json file at all

<br>

![docker-file-1](docker-file-1.png)

![docker-file-2](docker-file-2.png)

### Steps to docker a project:

![docker-file-6](docker-file-6.png)

### Port Forwarding

![docker-file-7](docker-file-7.png)

- there is NO limitation by default on your container to reach out
- it's strictly a limitation on the ability for incoming traffic to get into the container
- port forwarding is strictly a runtime constraint, means it's something we could only change when we started the container

### Docker compose cli:

- it would put the containers specified under the same network automatically
- run multiple containers at once
- avoid all the repetitive docker cli comment

### Volume:

- /app/node_modules
  - put a bookmark on the folder, like a placeholder inside the container
  - docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app a16cccf5f405aac0ddf16ca7379a5e708697f4411d80e190fbdefa0c7096e336
  - actually it is anonymouse volumes
- todo-mysql-data:/var/lib/mysql
  - named volume
- ./:/app
  - bind mount

### Production-Grade-Workflow:

- Dev --> Test --> Deployment -> Dev -> ...
- Testing:
  - First approach: you run the normal coontainer, start the test command using `docker exec -it <container id> npm run test`
    - pros: can manipulate the test suite from the termianl
    - crons: you have to remember the command and the container id
  - Second approcah: you could add the test container in the `docker-compose.yml` file and have it run the test command using `commands` field in the yaml file
    - pros: convenient since only need to run docker-compose
    - cons: do not have ability to manipulate the test suite (since even you attach the primary process of the test container, the test suite might actually runing in the secondary runing process) (attach command only attaching on the primary running process of the container)
    - ```console
      ❯ docker exec -it d74ce42a9fe7 sh
      /app # ps
      PID   USER     TIME  COMMAND
       1 root      0:00 npm run test
      18 root      0:00 node /app/node_modules/.bin/react-scripts test
      25 root      0:03 /usr/local/bin/node /app/node_modules/react-scripts/scripts/test.js
      76 root      0:00 sh
      82 root      0:00 ps
      ```
- Nginx:
  - dev enviroment: dev server to serve up the js file
  - production environment: use nginx as production server to serve the js file
- Multi-Step Docker Builds:
  - ![docker-multi-step](docker-multi-step.png)

## Kubernetes

![kubernetes](kubernetes.png)

### What is the Kubernetes?

- **Kubernetes is a tool for running a bunch of different containers**
- We give it some configureation to describe how we want our containers to run and interact with each other
- A cluster is a set of different virtual machines, and virtual machines we refer to as nodes
- Master is essentially a program that's going to manage everything inside of our cluster

### Why Kubernetes ?

- make communication between services very easy and straightforward
- make creating services like launching new copies and scaling the number of copies very easy and straightforward

### Pod:

#### What is pod:

- technically, it wraps up a container and techinically a pod can have multiple containers inside
- A Pod (as in a pod of whales or pea pod) is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.

#### Differences of containers, pods and node:

- Containers are packages of applications and execution environments.
- Pods are collections of closely-related or tightly coupled containers.
- Nodes are computing resources that house pods to execute workloads.

### Deployment:

#### What is Deployment:

- a deployment is a kubernetes object that is intended to manage a set of pods
- a deployment's jobs:

  1. the deployment inside kubernetes is going to make sure that pod automatically gets recreated if it the pod (container) crashed or stops running
  2. updates the pod when we update the code inside the container

     ![kubernetes-6](kubernetes-6.png)

#### Updating deployment:

1.  not preferred (since you need to specify the image version number in config file every time)

    ![kubernetes-7](kubernetes-7.png)

2.  Preferred way (use docker hub):

    ![kubernetes-8](kubernetes-8.png)

### Service (Kubernetes):

#### What is a service:

- a service is something that gives us access to the running pods inside of the cluster
- send me a request, and I will forward it on to the appropriate container

  ![kubernetes-2](kubernetes-2.png)

#### Networking with Services:

- a service is another kind of object in Kubernetes
- create services using config files
- communicate out of the clusters or between the pods are using services

##### Type of Services:

![kubernets-9](kubernetes-9.png)

### Kubernetes terms:

![kubernetes-3](kubernetes-3.png)

### Config Files:

- tells Kubernetes about the different deployments, pods, services (referred to as 'Objects') that we want to create
- written in YAML syntax (`-` in YAML means array)

- config file to create single pod:

  ![kubernetes-4](kubernetes-4.png)

- config file to create multiple pods using deployment configs to create deployment object

  ```yml
  #posts-depl.yaml
  apiVersion: apps/v1 #bucket of different objects called app/v1
  kind: Deployment #kind of object we try to create
  metadata:
      name: posts-depl
  spec: #specify exactly how this deployment should behave
      replicas: 1 #numbers of pods we want to create for a image
      selector: # take a look at all the differernt pods has been created, find all the pods with a label of app: post
          matchLabels:
              app: posts
      template: # template is where we specify the exact configuration of a pod that we this deployment to create
          metadata:
              labels:
                  app: posts
          spec: # spec for the pod
              containers:
                  - name: posts
                  image: rickyyyhuang/posts:0.0.1 #do not specify the version of the image for better updating deployment when there is a source code changes. it will always use the latest version of the image if version is not specified
  ```

- config file to create a node port service:

  ```yml
  #posts-srv.yaml
  apiVersion: v1
  kind: Service
  metadata:
      name: post-serv
  spec:
      type: NodePort
      selector: # we are telling the service to try to find all the different pods with a label of app post and expose traffic or expose those pods to the outside world
          app: posts
      ports: #list out all the different ports that want to expose on the target pod
          - name: posts
          protocol: TCP
          port: 4000 # port for the Node Port Service and handle traffic between the outside world
          targetPort: 4000 # the port that is attached to the container
  ```

  ![kubernetes-10](kubernetes-10.png)

  - nodePort 3xxxx is a randomly assigned port that we use to actually get access to that service from outside of our cluster
  - you can get that node port number by running the following command:
    ```console
    kubectl get services // OR
    kubectl describe service <service name>
    ```

- config file to create a cluster IP service:
  - we could co-locate the deployment config and the IP service that maps up to it, because we usually end up with a 1 to 1 mapping between cluster IP services and the deployment they are allowing to connect to

### Commands:

![kubernetes-5](kubernetes-5.png)

- new execution commmand:

  ```console
  kubectl exec [POD] -- [COMMAND]
  ```

```console
kubectl get deployments #list all running deployments

kubectl describe deployment <depl name> # print out detials about a specific deployment

kubectl apply -f <config file name> # create a object out of a configuration file

kubectl delete deployment <depl name>

kubectl rollout restart deployment <depl name>

kubectl get pod
kubectl delete pod <pod name>
```
