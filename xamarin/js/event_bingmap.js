
  var eventBingMap='';
    function LoadMap()
    {
      eventBingMap = new VEMap("eventBingMapDiv");
      eventBingMap.LoadMap();
    }

    function UnloadMap()
    {
      if (eventBingMap != null) {
         //eventBingMap.Dispose();
      }
    }
    function StartGeocoding( address )
    {
      eventBingMap.Find(null,    // what
        address, // where
        null,    // VEFindType (always VEFindType.Businesses)
        null,    // VEShapeLayer (base by default)
        null,    // start index for results (0 by default)
        null,    // max number of results (default is 10)
        null,    // show results? (default is true)
        null,    // create pushpin for what results? (ignored since what is null)
        null,    // use default disambiguation? (default is true)
        null,    // set best map view? (default is true)
        GeocodeCallback);  // call back function
    }
    function GeocodeCallback (shapeLayer, findResults, places, moreResults, errorMsg)
    {
       // if there are no results, display any error message and return
       if(places == null)
       {
          alert( (errorMsg == null) ? "There were no results" : errorMsg );
          return;
       }

       var bestPlace = places[0];
       
       // Add pushpin to the *best* place
       var location = bestPlace.LatLong;
       
       var newShape = new VEShape(VEShapeType.Pushpin, location);
       
       var desc = "Latitude: " + location.Latitude + "<br>Longitude:" + location.Longitude;
       newShape.SetDescription(desc);
       newShape.SetTitle(bestPlace.Name);
       eventBingMap.AddShape(newShape);
    }  
     
  

   jQuery(window).on('beforeunload', function (){
        UnloadMap();
   });     

