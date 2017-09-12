var pythonCode = "\n" +
    "# loads all elements of a specific platform (see 'url' variable) in increments of 'limit'\n" +
    "# and writes transcripts for each element into a file (see variable 'f').\n" +
    "# the increments are a nice way to track the progress.\n" +
    "# For gpl1261 the runtime was around 1 hour, and the resulting file was 1.3MB.\n" +
    "\n" +
    "import json\n" +
    "import urllib2\n" +
    "\n" +
    "limit = 200;\n" +
    "count = limit;\n" +
    "offset = 0;\n" +
    "total = 0;\n" +
    "\n" +
    "f = open('gpl1261_elem_transcripts.csv', 'a')\n" +
    "f.write(\"element, transcripts \\n\")\n" +
    "\n" +
    "while(count == limit):\n" +
    "    print \"Limit: %s Offset: %s\" % (limit, offset)\n" +
    "    count = 0;\n" +
    "    url = \"http://localhost:8080/Gemma/rest/v2/platforms/gpl1261/elements?limit=%s&offset=%s\" % (limit, offset)\n" +
    "    response = urllib2.urlopen(url)\n" +
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
    "BASE_URL <- 'http://www.chibi.ubc.ca/Gemma/rest/v2'\n" +
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
    "# this.content.df <- this.content.df[,!names(this.content.df) == \"differentialExpressionAnalyses\"] \n" +
    "\n" +
    "# Output as csv\n" +
    "write.csv(file=RESULT_FILE, x=this.content.df)\n";
