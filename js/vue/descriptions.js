var filterDescription = "<p>" +
    "                    Filtering can be done on any* property or nested property that the ExpressionExperiment class has (" +
    "                    and is mapped by hibernate ). E.g: 'curationDetails' or 'curationDetails.lastTroubledEvent.date'" +
    "                    </p><p>" +
    "                    * Any property of a supported type. Currently supported types are:" +
    "                    <ul>" +
    "                    <li>String - property of String type, required value can be any String.</li>" +
    "                    <li>Number - any Number implementation. Required value must be a string parseable to the specific Number type.</li>" +
    "                    <li>Boolean - required value will be parsed to true only if the string matches 'true', ignoring case.</li>" +
    "                    </ul>" +
    "                    </p><p>" +
    "                    Accepted operator keywords are:" +
    "                    <ul>" +
    "                    <li> '=' - equality</li>" +
    "                    <li> '!=' - non-equality</li>" +
    "                    <li> '<' - smaller than</li>" +
    "                    <li> '>' - larger than</li>" +
    "                    <li> '<=' - smaller or equal</li>" +
    "                    <li> '=>' - larger or equal</li>" +
    "                    <li> 'like' - similar string, effectively means 'contains', translates to the sql 'LIKE' operator (given value will be surrounded by % signs)</li>" +
    "                    </ul>" +
    "                    Multiple filters can be chained using 'AND' or 'OR' keywords.<br/>" +
    "                    Leave space between the keywords and the previous/next word! <br/>" +
    "                    E.g: <code>?filter=property1 < value1 AND property2 like value2</code>" +
    "                    </p><p>" +
    "                    If chained filters are mixed conjunctions and disjunctions, the query must be in conjunctive normal" +
    "                    form (CNF). Parentheses are not necessary - every AND keyword separates blocks of disjunctions." +
    "                    </p><p>" +
    "                    Example:<br/>" +
    "                    <code>?filter=p1 = v1 OR p1 != v2 AND p2 <= v2 AND p3 > v3 OR p3 < v4</code><br/>" +
    "                    Above query will translate to: <br/>" +
    "                    <code>(p1 = v1 OR p1 != v2) AND (p2 <= v2) AND (p3 > v3 OR p3 < v4;)</code>" +
    "                    </p><p>" +
    "                    Breaking the CNF results in an error." +
    "                    </p>" +
    "                    <p>" +
    "                    Filter \"curationDetails.troubled\" will be ignored if user is not an administrator." +
    "                    </p>";
var offsetDescription = "Optional parameter (defaults to 0) skips the specified amount of datasets when retrieving them from the database.";
var limitDescription = "Optional parameter (defaults to 20) limits the result to specified amount of datasets. Use 0 for no limit.";
var sortDescription = "Optional parameter (defaults to +id) sets the ordering property and direction.<br/>" +
    "                    Format is [+,-][property name]. E.g. \"-accession\" will translate to descending ordering by the" +
    "                    Accession property.<br/>" +
    "                    Note that this does not guarantee the order of the returned entities.<br/>" +
    "                    Nested properties are also supported (recursively).<br/>" +
    "                    E.g: <code>+curationDetails.lastTroubledEvent.date</code>";
var datasetDescription = "Can either be the ExpressionExperiment ID or its short name (e.g. GSE1234). Retrieval by ID" +
    "                        is more efficient. Only datasets that user has access to will be available";
var platformDescription = "Can either be the ArrayDesign ID or its short name (e.g. \"Generic_yeast\" or \"GPL1355\" ). Retrieval by ID" +
    "                         is more efficient. Only platforms that user has access to will be available.";
var probeDescription = "The name or ID of the platform element for which the genes should be retrieved. When using in scripts, " +
    "remember to URL-encode any forward slashes (see the compiled URL below).";
var taxonDescription = "can either be Taxon ID or one of its string identifiers:" +
    "                      scientific name, common name, abbreviation. It is recommended to use ID for efficiency.";
var geneDescription = "can either be the NCBI ID, Ensembl ID or official symbol. NCBI ID is the most efficient (and" +
    "                     guaranteed to be unique) identifier. Official symbol represents a gene homologue for a random taxon.";
var searchDescription = "The search query. Either plain text, or an ontology term URI. When using in scripts, remember to URL-encode any forward slashes (see the compiled URL below).";
