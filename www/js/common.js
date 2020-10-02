class Request {
    static send(path, method, data = {}) {
        // this promise will never reject to prevent unhandled promise rejections
        return new Promise((resolve, reject) => {

            // options for sending http requests
            const options = {
                type: method,
                contentType: "application/json; charset=utf-8",
                url: `https://teamdmx-sa.navinda.xyz${path}`,
                data: data,
                dataType: "json"
            }

            // send json strings on POST, PUT & DELETE requests
            if (method == "POST" || method == "PUT" || method == "DELETE") {
                options.data = JSON.stringify(data);
            }

            // create a new request with options
            const req = $.ajax(options);

            // when request is complete
            req.done((res) => {

                // if response doesn't have a status propery, ignore it
                if (res.status == undefined) return;

                // if response status is true, resovle the promoise
                if (res.status) {
                    resolve(res);

                } else {
                    // log the response
                    console.log(res);

                    // show error modal when status of the response is false
                    try {
                        alert(`${res.msg}`);
                    } catch (e) { }

                    // resolve the promise with false status
                    resolve({ status: false });
                }
            });

            // if request failed to complete
            req.fail((jqXHR, textStatus) => {
                // if no json response is recived, ignore it
                if (jqXHR.responseJSON == undefined) return;

                // show error modal 
                try {
                    alert(jqXHR.responseJSON.msg);
                } catch (e) {

                    // if no error msg is present to show, just show a generic error modal
                    console.log(e);
                    alert(`Unable to retrive data from the server: ${textStatus}`);
                }
                // resolve the promise with false status
                resolve({ status: false });
            });
        });
    }
}