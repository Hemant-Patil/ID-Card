/*
 * WebTrend Facade layer to track onClick and pageView events 
*/
		var webtrend = {
			webtrendCommonObj : null,
			webTrendsData : null,
			
			init : function() {
				webTrendsData = new Array();
				webtrendCommonObj = Object.create(webtrend);
				
			},

			/**
			 * track: OnClick Event
			 Example:
			  denJsonLandText: {"WebTrendsMetaData":{"entity":
									[
									{"meta": [{"name":"URI","content":"/dental/index.html"},
          									  {"name":"CNTNT_GRP","content":"Dental"},
          									  {"name":"PG_TITLE","content":"Dental - Dental Landing Page"},
          									  {"name":"KYEVNT","content":"/Portal/Corp Nav/Terms of Use"},
          									  {"name":"SBGRP","content":"Dental Landing Page"}],
 												"type":"DENTAL_INDEX","name":"LANDING_PAGE"
									},
									{"meta":[{"name":"URI","content":"/dental/index.html"},
          									 {"name":"CNTNT_GRP","content":"Dental"},
							        		 {"name":"PG_TITLE","content":"Dental - Dental Landing Page"},
          									 {"name":"KYEVNT","content":"/Portal/Corp Nav/Terms of Use"},
          							  	 	 {"name":"SBGRP","content":"Dental Landing Page"}],
 											  "type":"DENTAL_SIGNIN","name":"LANDING_PAGE"
									},
								
			 -------entity_name: Name of the entity 
			 |
			 ------entity_type:  Type of the entity
			 |
			 ------onSuccess:     This is a javaScript function to be called if the method returns successful. (optional)
			 |
			 ------onFail:        This is a javaScript function to be called if the method fails. (optional)
			 onButtonClick: This value is used to track that a button has been clicked.
			 Example:
			 <input type="image" src="/mb/images/shared/backbutton.gif" alt="Back" onClick="javascript:processOnClick('consent.warning.goback', 'UPDATE_PROFILE', 'back');" />
			 **/
			logWebMetricsOnCLickEvent : function(jsonText,  entity_name,entity_type, onSuccess, onFail) {
				webtrend.resetTag();
				if (onSuccess == 'undefined' || onSuccess == null) {
					onSuccess = "";
				}
				if (onFail == 'undefined' || onFail == null) {
					onFail = "";
				}
				webtrend.logWebMetricsEvent(jsonText, entity_name, entity_type);
				webtrend.ProcessOnClick(webTrendsData, onSuccess, onFail);
			},
			/**
			 * track:  ScreenView Event
			 |
			 -------entity_name: Name of the entity
			 |
			 ------entity_type:  Type of the entity
			 
			 ------onSuccess:     This is a javaScript function to be called if the method returns successful. (optional)
			 |
			 ------onFail:        This is a javaScript function to be called if the method fails. (optional)
			 onButtonClick: This value is used to track that a button has been clicked.
			 Example:
			 <input type="image" src="/mb/images/shared/backbutton.gif" alt="Back" onClick="javascript:processOnClick('consent.warning.goback', 'UPDATE_PROFILE', 'back');" />
			 **/
			logWebMetricsOnViewEvent : function(jsonText,  entity_name,entity_type, onSuccess, onFail) {
				webtrend.resetTag();
				webtrend.logWebMetricsEvent(jsonText, entity_name, entity_type);
				webtrend.ProcessOnView(webTrendsData, onSuccess, onFail);
			},

			/**
			 * Description: Reset webTrendsData object
			 **/

			resetTag : function() {
				webTrendsData["URI"] = "";
				webTrendsData["CNTNT_GRP"] = "";
				webTrendsData["PG_TTLE"] = "";
				webTrendsData["KY_EVNT"] = "";
				webTrendsData["SCNR_NM"] = "";
				webTrendsData["SCNR_STEP#"] = "";
				webTrendsData["SCNR_CS"] = "";
				webTrendsData["DL_TG"] = "";
				webTrendsData["SBGRP"] = "";
				webTrendsData["TL"] = "";
				webTrendsData["AGE"] = "";
				webTrendsData["GNDR_CD"] = "";
				webTrendsData["SMLL3"] = "";
				webTrendsData["SMLL4"] = "";
				webTrendsData["NM4"] = "";
			},
				/**
			 * Description: Based on entity name and type get data into webTrendsData object
			 **/
			logWebMetricsEvent : function(jsonText, entity_name, entity_type) {

				if (jsonText.WebTrendsMetaData == 'undefined' || jsonText.WebTrendsMetaData == null || jsonText.WebTrendsMetaData.entity == 'undefined' || jsonText.WebTrendsMetaData.entity == null || jsonText.WebTrendsMetaData.entity == '') {
					return;
				}

				len = jsonText.WebTrendsMetaData.entity.length;
				var root = jsonText.WebTrendsMetaData;
				for (var data = 0; data < len; data++) {
					//alert("name " + data + " : " + root.entity[data]["name"]);
					//alert("type " + data + " : " + root.entity[data]["type"] );

					if (entity_name == root.entity[data]["name"] && (entity_type == root.entity[data]["type"] || root.entity[data]["type"] == null )) {
						var m_len = jsonText.WebTrendsMetaData.entity[data].meta.length;					
						for (var meta_i = 0; meta_i < m_len; meta_i++) {
							var keyName = jsonText.WebTrendsMetaData.entity[data].meta[meta_i]["name"];
							var keyValue = jsonText.WebTrendsMetaData.entity[data].meta[meta_i]["content"];
							webTrendsData[keyName] = keyValue;
						}
						break;

					}

				}

			},

			/**
			 * track:  WebTrendsDataCollector.prototype.track = function(methodCall, webTrendsData, onSuccess, onFail);
			 |
			 ----Params:  methodCall, webTrendsData, onSuccess, onFail
			 |
			 -------methodCall:   This is a string value which dictates which type of event to trigger. There are 2 acceptable values:
			 |                    onScreenView: This value is used to track that a page has been viewed.
			 |                    onButtonClick: This value is used to track that a button has been clicked.
			 |
			 ------webTrendsData: This is an array that contains the data to be transferred to webTrends. Refer to section 4 for
			 |                    details on accepted values.
			 |
			 ------onSuccess:     This is a javaScript function to be called if the method returns successful. (optional)
			 |
			 ------onFail:        This is a javaScript function to be called if the method fails. (optional)
			 onButtonClick: This value is used to track that a button has been clicked.
			 **/
			ProcessOnClick : function(webTrendsData, onSuccess, onFail) {

				try {
					if(webTrendsData['URI']!= '' && webTrendsData['CNTNT_GRP']!= '' && webTrendsData['PG_TTLE']!= '' ){
						window.WebTrendsDataCollector.track("onButtonClick", webTrendsData);
					}
				} catch(e) {
					//Do not halt application because of webTrends tracking failure
				}
			},
			//onScreenView: This value is used to track that a page has been viewed.
			ProcessOnView : function(webTrendsData, onSuccess, onFail) {

				try {
					if(webTrendsData['URI']!= '' && webTrendsData['CNTNT_GRP']!= '' && webTrendsData['PG_TTLE']!= '' ){
						window.WebTrendsDataCollector.track("onScreenView", webTrendsData);
					}
				} catch(e) {
					//Do not halt application because of webTrends tracking failure
				}
			},
		}
		webtrend.init();
	

