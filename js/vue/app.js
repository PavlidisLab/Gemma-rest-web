Vue.use(TreeView);

// noinspection JSUnusedGlobalSymbols // Used in html templates
Vue.component('endpoint', {
    template: '#endpoint-template',

    props: {
        name: String,
        description: String,
        pathParams: Array,
        queryParams: Array,
        endpointUrlBase: String,
        extensions: Array,
        jsonResponse: {
            default: true,
            type: Boolean
        }
    },

    data: function () {
        return {
            //apiUrlBase: "http://localhost:8080/Gemma/rest/v2/", //For testing
            apiUrlBase: "http://www.chibi.ubc.ca/Gemma/rest/v2/",
            response: "{}",
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
            this.pathParams.forEach(function (pParam) {
                url = url.replace(/%\d+/, encodeURIComponent(pParam.value));
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
                    vm.isError = false;
                    vm.status = response.status;
                })
                .catch(function (error) {
                    vm.showLoading = false;
                    vm.response = error.data;
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
        },

        keyMonitor: function (event) {
            if (event.key === "Enter") {
                this.getResponse();
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
var apiApp = new Vue({
    el: '#mainContent',
    data: {
        showDatasets: false,
        showPlatforms: false,
        showOther: false,
        showGenes: false,
        showTaxa: false,
        pythonExample: pythonCode,
        rExample: rCode
    },
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
        getEvidenceQueryParams: function () {
            return [
                {name: "database", value: "", required: true, description: "The name of external database to match"},
                this.getOffsetParam(),
                {
                    name: "limit",
                    value: "10000",
                    required: false,
                    description: "Limit the number of results to this amount"
                }
            ];
        },
        getGeneCoexpQueryParams: function () {
            return [
                {
                    name: "with",
                    value: "",
                    required: true,
                    description: "The gene to calculate the coexpression with. Same formatting rules as with the 'gene' arg. apply."
                },
                {
                    name: "limit",
                    value: "100",
                    required: false,
                    description: "Limit the number of results to this amount"
                },
                {
                    name: "stringency",
                    value: "1",
                    required: false,
                    description: "Optional parameter controlling the stringency of coexpression search. Defaults to 1"
                }
            ];
        },

        // Single parameter getters
        getSearchParam: function () {
            return {
                name: "query",
                value: "http://purl.obolibrary.org/obo/OBI_0000105",
                required: true,
                description: searchDescription
            };
        },
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
        getDatasetsParam: function () {
            return {
                name: "datasets",
                value: "GSE2871,GSE2869,GSE2868",
                required: true,
                description: datasetsDescription
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
        },
        getGeneParam: function () {
            return {
                name: "gene",
                value: "ENSG00000157540",
                required: true,
                description: geneDescription
            };
        },
        getTaxonParam: function () {
            return {
                name: "taxon",
                value: "human",
                required: true,
                description: taxonDescription
            };
        },
        getChromosomeParam: function () {
            return {
                name: "chromosome",
                value: "21",
                required: true,
                description: "eg: 3, 21, X"
            };
        },
        getStrandParam: function () {
            return {
                name: "strand",
                value: "+",
                required: false,
                description: "<p>'+' or '-'</p><p>Defaults to '+'</p> (Note that this is WIP and currently does not do anything)."
            };
        },
        getStartParam: function () {
            return {
                name: "start",
                value: "37365790",
                required: true,
                description: "start of the region (nucleotide position)"
            };
        },
        getSizeParam: function () {
            return {
                name: "size",
                value: "1",
                required: true,
                description: "size of the region (in nucleotides)"
            };
        },
        getEditableParam: function () {
            return {
                name: "editableOnly",
                value: "false",
                required: false,
                description: "whether to only list editable objects. Optional, defaults to false"
            };
        },
        getPhenotypesParam: function () {
            return {
                name: "phenotypes",
                value: "http://purl.obolibrary.org/obo/DOID_11934,http://purl.obolibrary.org/obo/DOID_3119",
                required: true,
                description: phenotypesDescription
            };
        },
        getTreeParam: function(){
            return {
                name: "tree",
                value: "false",
                required: false,
                description: treeDescription
            };
        }
    }
});
