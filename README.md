# bl-api-index
A API server for image gettring, preprocessing and indexing in BlueLens.


# Setup
## Login to GCP(Google Cloud Platform) to upload docker image.
```sh
$ gcloud auth login
```

## Setup for BlueLens project
```sh
$ gcloud config set project bluelens-11b9b
```

## Create the bl-api-index Service & Deployment
```sh
kubectl create -f kubernetes/config.yaml
```

# Release 
release.sh 
```sh
# ./release.sh {TAG}
# sample
$ ./release.sh latest
```

## MongoDB 
### Connecting to the MongoDB Replica Set
Each MongoDB Replica Set will have its own DNS address. This will take the format <pod-name>.<service-name>.
The DNS addresses to use will be:

```sh
bl-db-image-0.bl-db-image.mongo
bl-db-image-1.bl-db-image.mongo
bl-db-image-2.bl-db-image.mongo
```
Put these in your connection url. For example:
```sh
mongodb://bl-db-image-0.bl-db-image.mongo bl-db-image-1.bl-db-image.mongo bl-db-image-2.bl-db-image.mongo:27017/dbname_?'
```


# Troubleshooting
### ERROR: Docker CLI operation failed
 - https://digitz.org/blog/docker-push-failing-in-google-container-registry/
