var datasetsDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>empty</code>.</p>" +
    "<p>" +
    "   A list of identifiers, separated by commas (e.g: <code>GSE2871,GSE2869,GSE2868</code>). Identifiers can either be the" +
    "   ExpressionExperiment ID or its short name. Retrieval by ID" +
    "   is more efficient." +
    "</p>" +
    "<p>Only datasets that user has access to will be available.</p>" +
    "<p>Do not combine different identifiers in one query.</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   If only a single identifier is provided, this endpoint effectively turns into the 'Specific dataset' endpoint, and should be treated as such" +
    "   (e.g: other parameters are disregarded, the returned data is a single object and not an array.)" +
    "</p>";


var filterDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>empty</code>.</p>" +
    "<p>" +
    "   Filtering can be done on any* property or nested property that the appropriate object class defines" +
    "   or inherits (and that is mapped by hibernate). <span class='description-imp'>These do not correspond to the properties of the " +
    "   objects returned by the API calls.</span> " +
    "</p>" +
    "<p>Class definitions: " +
    "   <ul>" +
    "       <li>Datasets: " +
    "           <a href='http://www.chibi.ubc.ca/Gemma/resources/apidocs/ubic/gemma/model/expression/experiment/ExpressionExperiment.html'>" +
    "           [javaDoc]</a> " +
    "           <a href='https://github.com/ppavlidis/Gemma/blob/development/gemma-core/src/main/java/ubic/gemma/model/expression/experiment/ExpressionExperiment.java'>" +
    "           [gitHub]</a>" +
    "       </li>" +
    "       <li>Platforms: " +
    "           <a href='http://www.chibi.ubc.ca/Gemma/resources/apidocs/ubic/gemma/model/expression/arrayDesign/ArrayDesign.html'>" +
    "           [javaDoc]</a> " +
    "           <a href='https://github.com/ppavlidis/Gemma/blob/development/gemma-core/src/main/java/ubic/gemma/model/expression/arrayDesign/ArrayDesign.java'>" +
    "           [gitHub]</a>" +
    "       </li>" +
    "   </ul>" +
    "</p>" +
    "<p>" +
    "   E.g: <code>curationDetails</code> or <code>curationDetails.lastTroubledEvent.date</code>." +
    "</p>" +
    "<p>" +
    "   * Any property of a supported type. Currently supported types are:" +
    "   <ul>" +
    "       <li>String - property of String type, required value can be any String.</li>" +
    "       <li>Number - any Number implementation. Required value must be a string parseable to the specific Number type.</li>" +
    "       <li>Boolean - required value will be parsed to true only if the string matches 'true', ignoring case.</li>" +
    "   </ul>" +
    "</p>" +
    "<p>Accepted operator keywords are:" +
    "   <ul>" +
    "       <li> '=' - equality</li>" +
    "       <li> '!=' - non-equality</li>" +
    "       <li> '<' - smaller than</li>" +
    "       <li> '>' - larger than</li>" +
    "       <li> '<=' - smaller or equal</li>" +
    "       <li> '=>' - larger or equal</li>" +
    "       <li> 'like' - similar string, effectively means 'contains', translates to the sql 'LIKE' operator (given value will be surrounded by % signs)</li>" +
    "   </ul>" +
    "   Multiple filters can be chained using <code>AND</code> and <code>OR</code> keywords.<br/>" +
    "   Leave space between the keywords and the previous/next word! <br/>" +
    "   E.g: <code>?filter=property1 < value1 AND property2 like value2</code>" +
    "</p>" +
    "<p>" +
    "   If chained filters are mixed conjunctions and disjunctions, the query must be in conjunctive normal" +
    "   form (CNF). Parentheses are not necessary - every AND keyword separates blocks of disjunctions." +
    "</p>" +
    "<p>" +
    "Example:<br/>" +
    "<code>?filter=p1 = v1 OR p1 != v2 AND p2 <= v2 AND p3 > v3 OR p3 < v4</code><br/>" +
    "Above query will translate to: <br/>" +
    "<code>(p1 = v1 OR p1 != v2) AND (p2 <= v2) AND (p3 > v3 OR p3 < v4;)</code>" +
    "</p>" +
    "<p>Breaking the CNF results in an error.</p>" +
    "<p>Filter <code>curationDetails.troubled</code> will be ignored if user is not an administrator.</p>";

var offsetDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>0</code>.</p>" +
    "<p>Skips the specified amount of objects when retrieving them from the database.</p>";

var limitDescriptionBase = "" +
    "<p>Limits the result to specified amount of objects. Use 0 for no limit.</p>";

var limitDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>20</code>.</p>" + limitDescriptionBase;

var sortDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>+id</code>.</p>" +
    "<p>Sets the ordering property and direction.</p>" +
    "<p>" +
    "   Format is <code>[+,-][property name]</code>. E.g. <code>-accession</code> will translate to descending ordering by the" +
    "   'Accession' property." +
    "</p>" +
    "<p>" +
    "   Note that this does <span class='description-imp'>not guarantee the order of the returned entities!</span> This is merely a signal to how the data should be pre-sorted before" +
    "   the limit and offset are applied." +
    "</p>" +
    "<p>" +
    "   Nested properties are also supported (recursively).<br/>" +
    "   E.g: <code>+curationDetails.lastTroubledEvent.date</code>" +
    "</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   When using in scripts, remember to URL-encode the '+' plus character (see the compiled URL below)." +
    "</p>";

var datasetDescription = "" +
    "<p class='description-frow'>Required, part of the URL path.</p>" +
    "<p>Can either be the dataset ID or its short name (e.g. <code>GSE1234</code>).</p>" +
    "<p>Retrieval by ID is more efficient.</p>" +
    "<p>Only datasets that user has access to will be available</p>";

var qValueDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>Q-value threshold</p>";

var dataFilterDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>false</code>.</p>" +
    "<p>If true, call returns filtered expression data.</p>";

var platformDescription = "" +
    "<p class='description-frow'>Required, part of the URL path.</p>" +
    "<p>Can either be the platform ID or its short name (e.g: <code>GPL1355</code>)</p>" +
    "<p>Retrieval by ID is more efficient. </p>" +
    "<p>Only platforms that user has access to will be available.</p>";

var probeDescription = "" +
    "<p class='description-frow'>Required, part of the URL path.</p>" +
    "<p>Can either be the probe name or ID. <br/>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   When using in scripts, remember to URL-encode any forward slashes in the probe name (see the compiled URL below)." +
    "</p>";

var geneDescriptionBase = "" +
    "<p>" +
    "   Can either be the NCBI ID (<code>1859</code>), Ensembl ID (<code>ENSG00000157540</code>) " +
    "   or official symbol (<code>DYRK1A</code>) of the gene." +
    "</p>" +
    "<p>NCBI ID is the most efficient (and guaranteed to be unique) identifier.</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   Official symbol represents a gene homologue for a random taxon, unless used in a specific taxon (see the Taxa Endpoints)." +
    "</p>";

var geneDescription = "" +
    "<p class='description-frow'>Required, part of the URL path.</p>" + geneDescriptionBase;


var geneWithDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" + geneDescriptionBase;

var geneCoexpLimitDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>100</code>.</p>" + limitDescriptionBase;

var geneEvidenceLimitDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>1000</code>.</p>" + limitDescriptionBase;


var stringencyDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>1</code>.</p>" +
    "<p>Sets the stringency of coexpression search.</p>";

var taxonDescription = "" +
    "<p class='description-frow'>Required, part of the URL path.</p>" +
    "<p>" +
    "   can either be Taxon ID, Taxon NCBI ID, or one of its string identifiers:" +
    "   scientific name, common name, abbreviation." +
    "</p>" +
    "<p>It is recommended to use Taxon ID for efficiency.</p>" +
    "<p>Please note, that not all taxa have all the possible identifiers available.</p>" +
    "<p>Use the 'All Taxa' endpoint to retrieve the necessary information. For convenience, below is a list of few example taxa: </p>" +
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

var editableDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>false</code>.</p>" +
    "<p>Whether to only list editable objects.</p>";

var treeDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>false</code>.</p>" +
    "<p>Whether the returned structure should be an actual tree (nested JSON objects).</p> " +
    "<p>" +
    "   Default is false - the tree is flattened and the tree structure information is stored as" +
    "   the values of the returned object." +
    "</p>";

var phenotypesDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>Phenotype value URIs separated by commas.</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   When using in scripts, remember to URL-encode any forward slashes in the phenotype value URIs (see the compiled URL below)." +
    "</p>";

var chromosomeDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>The chromosome of the query location. Eg: <code>3</code>, <code>21</code>, <code>X</code></p>";

var strandDescription = "" +
    "<p class='description-frow'>Optional, defaults to <code>+</code>.</p>" +
    "<p>Can either be <code>+</code> or <code>-</code>.</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   This is a WIP parameter and does currently not do anything" +
    "</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   When using in scripts, remember to URL-encode the '+' plus character (see the compiled URL below)." +
    "</p>";

var nuclStartDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>Number of the start nucleotide of the desired region.</p>";

var nuclSizeDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>Amount of nucleotides in the desired region (i.e. the length of the region).</p>";

var searchDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>The search query. Either plain text, or an ontology term URI.</p>" +
    "<p class='description-imp'>" +
    "   <span class='glyphicon glyphicon-th-large glyphicon-exclamation-sign'></span>" +
    "   When using in scripts, remember to URL-encode any forward slashes in the phenotype value URIs (see the compiled URL below)." +
    "</p>";

var extDbDescription = "" +
    "<p class='description-frow'>Required, defaults to <code>empty</code>.</p>" +
    "<p>The name of external database to match.</p>" +
    "<p>E.g: <code>PubMed</code>, <code>GEO</code>, <code>ArrayExpress</code>, <code>Genbank</code> etc.</p>";



