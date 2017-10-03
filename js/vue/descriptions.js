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
var datasetsDescription = "a list of identifiers, separated by commas (','). Identifiers can either be the\n" +
    "                         ExpressionExperiment ID or its short name (e.g. GSE1234). Retrieval by ID\n" +
    "                         is more efficient.\n" +
    "                         <p>" +
    "                         Only datasets that user has access to will be available.\n" +
    "                         </p>" +
    "                         <p>" +
    "                         Do not combine different identifiers in one query.\n" +
    "                         </p>";
var platformDescription = "Can either be the ArrayDesign ID or its short name (e.g. \"Generic_yeast\" or \"GPL1355\" ). Retrieval by ID" +
    "                         is more efficient. Only platforms that user has access to will be available.";
var probeDescription = "The name or ID of the platform element for which the genes should be retrieved. <br/>" +
    "When using in scripts, remember to URL-encode any forward slashes (see the compiled URL below).";

var taxonDescription = "<p>can either be Taxon ID, Taxon NCBI ID, or one of its string identifiers:" +
    "                      scientific name, common name, abbreviation.</p>" +
    "<p>It is recommended to use Taxon ID for efficiency.</p>" +
    "<p>Please note, that not all taxa have all the possible identifiers available.</p>" +
    "<p>Use the 'all taxa' endpoint to retrieve the necessary information. For convenience, below is a list of some common taxa: </p>" +
    "<table>" +
    "<tr><th> ID </th><th>Comm.name</th><th>Scient.name</th><th>Abbr.</th><th>NcbiID</th></tr>" +
    "<tr><td>  1 </td><td> human           </td><td> Homo sapiens              </td><td>              </td><td>    9606 </td></tr>" +
    "<tr><td>  2 </td><td> mouse           </td><td> Mus musculus              </td><td>              </td><td>   10090 </td></tr>" +
    "<tr><td>  3 </td><td> rat             </td><td> Rattus norvegicus         </td><td>              </td><td>   10116 </td></tr>" +
    "<tr><td>  4 </td><td> salmonid        </td><td> Salmonidae                </td><td>              </td><td>    8015 </td></tr>" +
    "<tr><td>  5 </td><td> atlantic salmon </td><td> Salmo salar               </td><td> ssal         </td><td>    8030 </td></tr>" +
    "<tr><td>  6 </td><td> rainbow trout   </td><td> Oncorhynchus mykiss       </td><td> omyk         </td><td>    8022 </td></tr>" +
    "<tr><td>  7 </td><td> whitefish       </td><td> Coregonus clupeaformis    </td><td> cclu         </td><td>   59861 </td></tr>" +
    "<tr><td>  8 </td><td> chinook salmon  </td><td> Oncorhynchus tshawytscha  </td><td> otsh         </td><td>   74940 </td></tr>" +
    "<tr><td> 10 </td><td> rainbow smelt   </td><td> Osmerus mordax            </td><td> omor         </td><td>    8014 </td></tr>" +
    "<tr><td> 11 </td><td> yeast           </td><td> Saccharomyces cerevisiae  </td><td>              </td><td>    4932 </td></tr>" +
    "<tr><td> 12 </td><td> zebrafish       </td><td> Danio rerio               </td><td>              </td><td>    7955 </td></tr>" +
    "<tr><td> 13 </td><td> fly             </td><td> Drosophila melanogaster   </td><td>              </td><td>    7227 </td></tr>" +
    "<tr><td> 14 </td><td> worm            </td><td> Caenorhabditis elegans    </td><td>              </td><td>    6239 </td></tr>" +
    "</table>";

var geneDescription = "can either be the NCBI ID, Ensembl ID or official symbol. NCBI ID is the most efficient (and" +
    "                     guaranteed to be unique) identifier. Official symbol represents a gene homologue for a random taxon.";
var searchDescription = "The search query. Either plain text, or an ontology term URI. " +
    "<br/>When using in scripts, remember to URL-encode any forward slashes (see the compiled URL below).";
var phenotypesDescription = "phenotype value URIs separated by commas. <br/>When using in scripts, remember to URL-encode any forward slashes (see the compiled URL below).";
var treeDescription = "whether the returned structure should be an actual tree (nested JSON objects). Default is" +
    "                          false - the tree is flattened and the edges of the tree are stored in" +
    "                          the values of the value object.";
