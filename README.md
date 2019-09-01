# Mongorest Operator
<h1 align="center">
  <br>
  <a href="https://github.com/SaifRehman/mongo-rest-operator"><img src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjanakirammsv%2Ffiles%2F2018%2F05%2Frh-os.jpg" alt="openshift" width="IBM"></a>
  <br>
      Mongorest operator for Openshift
  <br>
  <br>
</h1>

<h4 align="center">Powered by Openshift and OperatorSDK</h4>

<p align="center">
  <a>
    <img src="https://img.shields.io/travis/keppel/lotion/master.svg"
         alt="Travis Build">
  </a>
</p>
<br>
Allows you to develop mongo microservices just by defining the yamls on a openshift cluster 

## Install Operator on Openshift

1. clone the repo
```
$ git clone https://github.com/SaifRehman/mongo-rest-operator.git
```
2. install ***serviceaccount***, ***rolebinding***, ***role***, ***crd***, and ***operator***
```
$ oc apply -f deploy/service_account.yaml
$ oc apply -f deploy/role.yaml
$ oc apply -f deploy/role_binding.yaml
$ oc apply -f deploy/operator.yaml
$ oc apply -f deploy/crds/mongorest_v1alpha1_mongorest_crd.yaml
```
## Creat your first MongoDB CRUD Microservice in minutes!
1. create mongorest yaml, example reservation microservice. This is a reservation microservice which performs crud operations on mongodb database to store firstname,  lastname, and uid. 
``` YAML
apiVersion: mongorest.ibm.com/v1alpha1
kind: Mongorest
metadata:
  name: reservationmicroservice
spec:
  replicaCount: 3 #number of replica needed
  namespace: "kubeapp"
  metadata:
    name: reservation-microservice
  mongodb: 
    host: "mongodb.kubeapp" # connection info of mongodb
    username: "YWRtaW4="
    password: "YWRtaW4="
    endpoint: "reservation"
    db: "sampledb"
    schema: "Reservation"
    model: "{'firstname':'String','lastname':'String','uid':'String'}" # model of your mongo schema
  buildconfig: 
    imagename: "reservation-microservice:latest"
  routes:
    host: "reservation-microservice-kubeapp.apps.192.168.64.21.nip.io"
```
4. Apply these YAML configuration