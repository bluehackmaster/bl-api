function Response() {

    if (!(this instanceof Response)) {
        return new Response();
    }
    this.code = 0
    this.message = "Success";
}

module.exports = Response;
