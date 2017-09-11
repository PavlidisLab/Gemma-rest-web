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

var rCode = " working on it!";
