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



# Troubleshooting
### ERROR: Docker CLI operation failed
 - https://digitz.org/blog/docker-push-failing-in-google-container-registry/
