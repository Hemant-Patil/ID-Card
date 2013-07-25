var WebTrendsDataCollector = {
	track : function(methodCall, webTrendsData, onSuccess, onFail)
	{
		try {
			var args = {};
			args.methodCall = methodCall;
			args.URI = webTrendsData["URI"];
			args.PG_TTLE = webTrendsData["PG_TTLE"];
			args.SCNR_NM =webTrendsData["SCNR_NM"];
			args.CNTNT_GRP =webTrendsData["CNTNT_GRP"];
			args.SCNR_STP =webTrendsData["SCNR_STEP#"];
			args.SCNR_CS =webTrendsData["SCNR_CS"];
			args.KY_EVNT =webTrendsData["KY_EVNT"];
			args.DL_TG =webTrendsData["DL_TG"];
			args.SBGRP =webTrendsData["SBGRP"];
			args.TL =webTrendsData["TL"];
			args.AGE =webTrendsData["AGE"];
			args.GNDR_CD =webTrendsData["GNDR_CD"];
			args.SMLL3 =webTrendsData["SMLL3"];
			args.SMLL4 =webTrendsData["SMLL4"];
			args.NM3 =webTrendsData["NM3"];
			args.NM4 =webTrendsData["NM4"];
			return cordova.exec(onSuccess, onFail, "WebTrendsDataCollector", methodCall, [args]);
		}
		catch(e) {
			//console.log(e);
		}
	}
};