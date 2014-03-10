using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace LimeBootstrapLocalManualApi {
    public class ManualController : ApiController {

        // GET api/manual/
        public HttpResponseMessage Get(HttpRequestMessage request) {

            var response = Request.CreateResponse( );

            //if (!response.Headers.Contains("Content-Type")) {
            //    response.Headers.Add("Content-Type", "text/json");
            //}

            response.Content = new StringContent(Builder.build());
            response.StatusCode = HttpStatusCode.OK;
            response.Content.Headers.Add("Access-Control-Allow-Origin", "*");

            return response;

            
        }

       
    }
}
