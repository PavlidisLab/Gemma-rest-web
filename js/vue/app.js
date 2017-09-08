// noinspection JSUnusedGlobalSymbols // Used in html templates
Vue.component('endpoint', {
    template: '#endpoint-template',

    props: {
        name: String,
        description: String,
        pathParams: Array,
        queryParams: Array,
        endpointUrlBase: String,
        extensions: Array
    },

    data: function () {
        return {
            apiUrlBase: "http://localhost:8080/Gemma/rest/v2/",
            // apiUrlBase: "http://www.chibi.ubc.ca/Gemma/rest/v2/", //TODO change for production
            response: "{}",
            rawResponse: null,
            show: false,
            status: null,
            isError: false,
            loadingMsgBase: "Fetching data",
            loadingMsgFull: null,
            showLoading: false,
            completeUrl: "",
            dots: 0
        }
    },

    methods: {
        computeUrl: function () {
            var url = this.apiUrlBase + this.endpointUrlBase;
            var num = 1;
            this.pathParams.forEach(function (pParam) {
                url = url.replace(/%\d+/, pParam.value);
            });
            var first = true;
            this.queryParams.forEach(function (qParam) {
                if (qParam.value !== null && qParam.value !== "") {
                    url += (first ? "?" : "&") + qParam.name + "=" + encodeURIComponent(qParam.value);
                    first = false;
                }
            });
            this.completeUrl = url;
        },
        getResponse: function () {
            var vm = this;
            this.status = null;
            this.showLoading = true;
            this.refreshLoading();

            axios.get(this.completeUrl)
                .then(function (response) {
                    vm.showLoading = false;
                    vm.response = response.data;
                    vm.rawResponse = response;
                    vm.isError = false;
                    vm.status = response.status;
                })
                .catch(function (error) {
                    vm.showLoading = false;
                    vm.response = error.data;
                    vm.rawResponse = error;
                    vm.isError = true;
                    vm.status = error.status;
                });
        },

        getLoading: function () {
            var dotStr = "";
            for (var i = 0; i < this.dots; i++) {
                dotStr += ".";
            }
            this.dots = (this.dots + 1) % 4;
            this.loadingMsgFull = this.loadingMsgBase + dotStr;
        },

        refreshLoading: function () {
            if (this.showLoading) {
                var vm = this;
                setTimeout(function () {
                    vm.getLoading();
                    vm.refreshLoading();
                }, 200);
            } else {
                this.loadingMsgFull = null;
                this.dots = 0;
            }
        }
    },

    created: function () {
        this.computeUrl();
    }
});

Vue.component('api-param', {
    template: '#api-param-template',
    props: ['param'],
    data: function () {
        return {
            showInfo: false
        }
    }

});

// noinspection JSUnusedGlobalSymbols // Used in html templates
var datasetApi = new Vue({
    el: '#mainContent',
    methods: {
        // Parameter bundles getters

        getDatasetsAllQueryParams: function () {
            return [this.getFilterParam(), this.getOffsetParam(), this.getLimitParam(), this.getSortParam()];
        },
        getDatasetsDiffAnalQueryParams: function () {
            return [
                {name: "qValueThreshold", value: "", required: true, description: "Q-value threshold"},
                this.getOffsetParam(),
                this.getLimitParam()
            ];
        },
        getDatasetsDataQueryParams: function () {
            return [{
                name: "filter",
                value: "false",
                required: false,
                description: "filters the expression data so that they do not contain samples under a minimum threshold."
            }]
        },
        getOffsetLimitQueryParams: function () {
            return [this.getOffsetParam(), this.getLimitParam()];
        },
        getPlatformsElementPathParams: function () {
            return [this.getPlatformParam(), this.getProbeParam()];
        },

        // Single parameter getters

        getFilterParam: function () {
            return {name: "filter", value: "", required: false, description: filterDescription};
        },
        getOffsetParam: function () {
            return {name: "offset", value: "0", required: false, description: offsetDescription};
        },
        getLimitParam: function () {
            return {name: "limit", value: "20", required: false, description: limitDescription};
        },
        getSortParam: function () {
            return {name: "sort", value: "+id", required: false, description: sortDescription};
        },
        getDatasetParam: function () {
            return {
                name: "dataset",
                value: "GSE81454",
                required: true,
                description: datasetDescription
            };
        },
        getPlatformParam: function () {
            return {
                name: "platform",
                value: "GPL1355",
                required: true,
                description: platformDescription
            };
        },
        getProbeParam: function () {
            return {
                name: "probe",
                value: "AFFX_Rat_beta-actin_M_at",
                required: true,
                description: probeDescription
            };
        }
    }
});

