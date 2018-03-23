// Author: Stepan Tesar
var pythonCode = "\n" +
    "# loads all elements of a specific platform (see 'url' variable) in increments of 'limit'\n" +
    "# and writes transcripts for each element into a file (see variable 'f').\n" +
    "# This script also includes example usage of the basic authentication functionality, which in this case\n" +
    "# allows access to the authenticated users private platforms.\n" +
    "# For gpl1261 the resulting file was 1.3MB.\n" +
    "\n" +
    "import json\n" +
    "import urllib2\n" +
    "import base64\n" +
    "\n" +
    "limit = 200\n" +
    "count = limit\n" +
    "offset = 0\n" +
    "total = 0\n" +
    "\n" +
    "username = 'user'\n" +
    "password = 'xxxx'\n" +
    "\n" +
    "f = open('gpl1261_elem_transcripts.csv', 'a')\n" +
    "f.write(\"element, transcripts \\n\")\n" +
    "\n" +
    "# First few lines of the output file should look like this:\n" +
    "\n" +
    "# element, transcripts \n" +
    "# AFFX-TrpnX-M_at, ''\n" +
    "# AFFX-TrpnX-5_at, ''\n" +
    "# AFFX-TrpnX-3_at, ''\n" +
    "# AFFX-TransRecMur/X57349_M_at, 'NM_011638 '\n" +
    "# AFFX-TransRecMur/X57349_5_at, 'NM_011638 '\n" +
    "# AFFX-TransRecMur/X57349_3_at, 'NM_011638 '\n" +
    "\n" +
    "while(count == limit):\n" +
    "    print \"Limit: %s Offset: %s\" % (limit, offset)\n" +
    "    count = 0;\n" +
    "    url = \"http://gemma.msl.ubc.ca/rest/v2/platforms/gpl1261/elements?limit=%s&offset=%s\" % (limit, offset)\n" +
    "\n" +
    "    # Add basic authentication header\n" +
    "    request = urllib2.Request(url)\n" +
    "    base64string = base64.encodestring('%s:%s' % (username, password)).replace('\\n', '')\n" +
    "    request.add_header(\"Authorization\", \"Basic %s\" % base64string)\n" +
    "\n" +
    "    response = urllib2.urlopen(request)\n" +
    "    text = response.read()\n" +
    "\n" +
    "    try:\n" +
    "        decoded = json.loads(text)\n" +
    "        for data in decoded['data']:\n" +
    "            row = data['name']\n" +
    "            row+= \", \\'\"\n" +
    "            count+= 1\n" +
    "            for sums in data['geneMappingSummaries']:\n" +
    "                for product in sums['geneProductIdMap'].values():\n" +
    "                    row+= \"%s \" % product['name']\n" +
    "            row+=\"\\'\\n\"\n" +
    "            f.write(row)\n" +
    "\n" +
    "    except (ValueError, KeyError, TypeError):\n" +
    "        print \"JSON format error\"\n" +
    "    print \"Processed %s rows.\" % count\n" +
    "    offset+= limit\n" +
    "    total += count\n" +
    "\n" +
    "print \"Processed %s rows in total.\" % total";

var rCode = "\n" +
    "# Example script demonstrating usage of Gemma REST API\n" +
    "# This script calls the 'Datasets' endpoint (see the 'Api parameters' section)\n" +
    "# and writes the response data to a file (RESULT_FILE).\n" +
    "\n" +
    "library(httr)\n" +
    "library(jsonlite)\n" +
    "library(RCurl)\n" +
    "\n" +
    "# Constants\n" +
    "BASE_URL <- 'http://gemma.msl.ubc.ca/rest/v2'\n" +
    "RESULT_FILE <- './rGemmaData.csv'\n" +
    "\n" +
    "# Api parameters\n" +
    "\n" +
    "offset <- '100'\n" +
    "limit <- '10'\n" +
    "sort <- curlEscape('+id')\n" +
    "\n" +
    "# Api call\n" +
    "url  <- paste(BASE_URL, '/datasets', '?offset=', offset, '&limit=', limit, '&sort=', sort, sep='')\n" +
    "cat(\"Calling gemma REST API:\", url, '\\n')\n" +
    "raw.result <- GET(url = url)\n" +
    "this.content <- fromJSON(rawToChar(raw.result$content))\n" +
    "\n" +
    "# Response check\n" +
    "if(raw.result$status_code != 200){\n" +
    "  cat(\"Received a response with status\", raw.result$status_code, '\\n', file = stderr())\n" +
    "  stop(this.content$error$message);\n" +
    "}\n" +
    "\n" +
    "# Change the 'list of lists' to a dataframe\n" +
    "this.content.df <- do.call(what = \"rbind\", args = lapply(this.content, as.data.frame))\n" +
    "\n" +
    "# Remove differentialAnalyses subclass (required to flatten the data in order to write it in the file)\n" +
    "this.content.df$differentialExpressionAnalyses <- NULL\n" +
    "\n" +
    "# Output as csv\n" +
    "write.csv(file=RESULT_FILE, x=this.content.df)\n";
