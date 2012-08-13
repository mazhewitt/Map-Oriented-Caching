describe("Geocache", function(){

    var geoCache;
    beforeEach(function(){
        geoCache = new Geocache();
        geoCache.init(gpxFile);
    });
    
    it("can be initialised from a GPX file", function(){
        expect(geoCache.name).toBeDefined();
    });
    
    it("has a name", function(){
        expect(geoCache.name).toEqual("Devil's Porridge");
    });
    
    it("has a description", function(){
        expect(geoCache.description.match(/The Shell Crisis/)).toBeTruthy();
    });
    
    it("has a GCCode", function(){
        expect(geoCache.GCCode).toEqual("GC3C8Z9");
    });
	
	it ("has a GUID", function(){
		expect(geoCache.GUID).toEqual("44e2a53f-ab42-4e1a-9841-cbb736e256fc");
	});
    
    it("has a list of waypoints", function(){
        var wayPointList = geoCache.getWaypoints();
        expect(wayPointList.length).toEqual(2);
        // first waypoint
        expect(wayPointList[0].name).toEqual("Devil's Porridge");
        expect(wayPointList[0].coordinate.lat).toEqual(55.001483);
        expect(wayPointList[0].coordinate.lon).toEqual(-3.012433);
        // second waypoint
        // lat=\"54.999733\" lon=\"-3.020833\"
        expect(wayPointList[1].name).toEqual("GC3C8Z9 Parking");
        expect(wayPointList[1].coordinate.lat).toEqual(54.999733);
        expect(wayPointList[1].coordinate.lon).toEqual(-3.020833);
        
    });
    
    
    var gpxFile = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<gpx xmlns:xsi=\"http:\/\/www.w3.org\/2001\/XMLSchema-instance\" xmlns:xsd=\"http:\/\/www.w3.org\/2001\/XMLSchema\" version=\"1.0\" creator=\"Groundspeak, Inc. All Rights Reserved. http:\/\/www.groundspeak.com\" xsi:schemaLocation=\"http:\/\/www.topografix.com\/GPX\/1\/0 http:\/\/www.topografix.com\/GPX\/1\/0\/gpx.xsd http:\/\/www.groundspeak.com\/cache\/1\/0 http:\/\/www.groundspeak.com\/cache\/1\/0\/cache.xsd\" xmlns=\"http:\/\/www.topografix.com\/GPX\/1\/0\">\n  <name>Cache Listing Generated from Geocaching.com<\/name>\n  <desc>This is an individual cache generated from Geocaching.com<\/desc>\n  <author>Account \"Mnementh &amp; Rustica\" From Geocaching.com<\/author>\n  <email>contact@geocaching.com<\/email>\n  <url>http:\/\/www.geocaching.com<\/url>\n  <urlname>Geocaching - High Tech Treasure Hunting<\/urlname>\n  <time>2012-07-31T09:00:02.3119971Z<\/time>\n  <keywords>cache, geocache<\/keywords>\n  <bounds minlat=\"54.999733\" minlon=\"-3.020833\" maxlat=\"55.001483\" maxlon=\"-3.012433\" \/>\n  <wpt lat=\"55.001483\" lon=\"-3.012433\">\n    <time>2012-02-08T08:00:00Z<\/time>\n    <name>GC3C8Z9<\/name>\n    <desc>Devil's Porridge by Mnementh &amp; Rustica, Traditional Cache (3\/1.5)<\/desc>\n    <url>http:\/\/www.geocaching.com\/seek\/cache_details.aspx?guid=44e2a53f-ab42-4e1a-9841-cbb736e256fc<\/url>\n    <urlname>Devil's Porridge<\/urlname>\n    <sym>Geocache<\/sym>\n    <type>Geocache|Traditional Cache<\/type>\n    <groundspeak:cache id=\"2725562\" available=\"True\" archived=\"False\" xmlns:groundspeak=\"http:\/\/www.groundspeak.com\/cache\/1\/0\">\n      <groundspeak:name>Devil's Porridge<\/groundspeak:name>\n      <groundspeak:placed_by>Mnementh &amp; Rustica<\/groundspeak:placed_by>\n      <groundspeak:owner id=\"1685978\">Mnementh &amp; Rustica<\/groundspeak:owner>\n      <groundspeak:type>Traditional Cache<\/groundspeak:type>\n      <groundspeak:container>Micro<\/groundspeak:container>\n      <groundspeak:difficulty>3<\/groundspeak:difficulty>\n      <groundspeak:terrain>1.5<\/groundspeak:terrain>\n      <groundspeak:country>United Kingdom<\/groundspeak:country>\n      <groundspeak:state>Northwest England<\/groundspeak:state>\n      <groundspeak:short_description html=\"True\">&lt;center&gt;\n&lt;p&gt;&lt;font face=\"Georgia\" size=\"2\"&gt;&lt;i&gt;\"The nitroglycerin on the one side and the gun-cotton on the other are kneaded into a sort of a &lt;b&gt;devil's porridge&lt;\/b&gt;\"&lt;\/i&gt;&lt;\/font&gt;&lt;\/p&gt;\n&lt;p&gt;Sir Arthur Conan Doyle, 1917&lt;\/p&gt;\n&lt;\/center&gt;\n\n<\/groundspeak:short_description>\n      <groundspeak:long_description html=\"True\">&lt;b&gt;&lt;u&gt;The Shell Crisis&lt;\/u&gt;&lt;\/b&gt;\n&lt;p&gt;1915: Britain and its Allies are in the middle of the Great War. There have been multiple failures of allied attacks along the front lines of Europe and at Dardanelles and Gallipoli in the eastern Mediterranean. Britain is not producing enough ammunition to fight on all fronts.&lt;\/p&gt;\n&lt;p&gt;This \"Shell Crisis\", \"Great Shell Shortage\" or \"Shell Scandal\", helps bring down the Liberal Government. A new coalition government takes control in May 1915, with future Prime Minister David Lloyd George appointed Minister of Munitions to address the issue.&lt;\/p&gt;\n&lt;b&gt;&lt;u&gt;Massive Munitions Manufacture&lt;\/u&gt;&lt;\/b&gt;\n&lt;p&gt;In response to the Shell Crisis, in &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;November 1915&lt;\/font&gt; construction began here on a huge munitions factory that:&lt;\/p&gt;\n&lt;ul&gt;\n&lt;li&gt;was built in less than &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;1 year&lt;\/font&gt;;&lt;\/li&gt;\n&lt;li&gt;stretched &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;9 miles&lt;\/font&gt; from Dornock in the west to Longtown in the east;&lt;\/li&gt;\n&lt;li&gt;boasted &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;100 miles&lt;\/font&gt; of water mains;&lt;\/li&gt;\n&lt;li&gt;&lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;130 miles&lt;\/font&gt; of internal railway;&lt;\/li&gt;\n&lt;li&gt;&lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;30 miles&lt;\/font&gt; of road;&lt;\/li&gt;\n&lt;li&gt;and contained &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;two towns&lt;\/font&gt;:&lt;\/li&gt;\n&lt;li&gt;Eastriggs and Gretna to house over &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;30,000 employees&lt;\/font&gt;.&lt;\/li&gt;\n&lt;\/ul&gt;\n&lt;b&gt;&lt;u&gt;Devil's Porridge&lt;\/u&gt;&lt;\/b&gt;&lt;br \/&gt;\n&lt;p&gt;The cache is sited overlooking the eastern end of the huge factory site, HM Factory, Gretna. Here was produced the Devil's porridge:&lt;\/p&gt;\n&lt;ul&gt;\n&lt;li&gt;properly known as &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;Cordite Research Department formula B&lt;\/font&gt; (Cordite RDB);&lt;\/li&gt;\n&lt;li&gt;originally created for the &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;Royal Navy&lt;\/font&gt; is response to a shortage of acetone;&lt;\/li&gt;\n&lt;li&gt;comprises &lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;52% collodion, 42% nitroglycerine and 6% Vaseline&lt;\/font&gt;;&lt;\/li&gt;\n&lt;li&gt;&lt;font face=\"Lucida Console\" size=\"2\" color=\"purple\"&gt;800 tons&lt;\/font&gt; was made here per week during peak production in 1917.&lt;\/li&gt;\n&lt;\/ul&gt;\n&lt;p&gt;The output of the HM Factory, Gretna was more than all other munitions factories in Britain combined and played a key role in the Allies' victory.&lt;\/p&gt;\n&lt;b&gt;&lt;u&gt;Post World War 1&lt;\/u&gt;&lt;\/b&gt;&lt;br \/&gt;\n&lt;p&gt;After the end of World War One the factories were demolished, but the 2500 acre site near here at Mossband was retained and used as ammunition storage. It is still in use today as an MoD Storage and Distribution Agency depot, but is expected to close in 2014.&lt;\/p&gt;\n&lt;b&gt;&lt;u&gt;The Cache&lt;\/u&gt;&lt;\/b&gt;&lt;br \/&gt;\nDevil's Porridge is unstable if stored for too long, so be quick and please replace the cache exactly as found.&lt;br \/&gt;\n&lt;br \/&gt;\nPlaced with kind permission of the Woodland Trust.&lt;br \/&gt;\n&lt;br \/&gt;\nBYOP\n&lt;p&gt;Additional Hidden Waypoints&lt;\/p&gt;PK3C8Z9 - GC3C8Z9 Parking&lt;br \/&gt;N 54\u00b0 59.984 W 003\u00b0 01.250&lt;br \/&gt;&lt;br \/&gt;<\/groundspeak:long_description>\n      <groundspeak:encoded_hints>This porridge is \nNot to be found in the heavens\nNor in the Styx\nBut in the sticks.<\/groundspeak:encoded_hints>\n      <groundspeak:logs>\n        <groundspeak:log id=\"251704792\">\n          <groundspeak:date>2012-07-24T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Write note<\/groundspeak:type>\n          <groundspeak:finder id=\"1685978\">Mnementh &amp; Rustica<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">For those with DNFs, there is no requirement to scrabble around near the fly tipping. If you follow suggested route through the woods, this cache will be an easier find than taking the shorter route and all rubbish can be avoided.\nMnementh<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"248522689\">\n          <groundspeak:date>2012-07-12T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Didn't find it<\/groundspeak:type>\n          <groundspeak:finder id=\"3301606\">karma reprint<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Hmmmm no gloves, not keen. Later....<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"247593877\">\n          <groundspeak:date>2012-07-08T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"21987\">GAZ<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Nabbed this one after nabbing BigLads puzzle cache in Longtown. \nParked at the suggested place and had a lovely walk through the woods to GZ..........NOT!......parked as flipping close to it as I could, as the woods were boggy as hell, and I only had my trainers on! [:P]\nOnce at GZ, the GPSr was all over the place, but found it in the end!\n\nEnjoyed my (very short) walk, shame about the fly tipping [:(!]\n\nGaz<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"242034810\">\n          <groundspeak:date>2012-06-14T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"3841113\">the-muggler<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Interesting history of the area, and a great container to go with it, though not sure it is a 3 Star difficulty.  Took a bit of finding with erratic signal, but only about 10 mins searching.....tftc<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"241013491\">\n          <groundspeak:date>2012-06-10T13:21:28Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"3893530\">The Key Clan.<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Found after a short search. Lovely walk. SL TNLN TFTC <\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"241013441\">\n          <groundspeak:date>2012-06-10T13:21:14Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"5520989\">Msbrownsboy<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Tftc SL lovely place <\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"232451420\">\n          <groundspeak:date>2012-05-06T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"108624\">MBFace<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">I parked as suggested and enjoyed the walk through the woods to the cache location.   It didn't take long to find the cute container.  I left a CITO Micro Geocoin - more because it would fit than a comment on the nearby fly tipping [8D].  Thanks for the cache and also the informative description [:D].<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"227286273\">\n          <groundspeak:date>2012-04-16T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"466895\">The Hudson gang<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Cache soon found after a lovely woodland walk, great container.\nSL TFTC<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"225201285\">\n          <groundspeak:date>2012-04-09T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"5614074\">Mattelly2<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">TFTC. Nice walk.<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"225081254\">\n          <groundspeak:date>2012-04-09T14:19:39Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"2472035\">Newlambator<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Amazing little cache. Loved the style of the micro :) \n\nTFTC<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"223980274\">\n          <groundspeak:date>2012-04-06T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"1001413\">kiya1994<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Despite not being local, I've been interested in the birth of the Carlisle State Brewery and the origins of the  Devil's Porridge since my dad told me about it when I was doing a project on the First World War at primary school.  While everyone else covered the horrors of the Somme and Ypres, I dared to be different and focussed on munitions manufacture and the consequential nationalisation of alcohol brewing and drinking in the area. Hmmmm.\n\nMy interest was re-kindled when we came to live and work in the area many years ago and I made a friend whose grandmother had been a \"munitionette\" at the Gretna site during the First World War.   On meeting her, I felt that my disappointment 20 years earlier on receiving a \"missed the point\"comment on my thoroughly researched project (complete with a State Brewery beer bottle and a traced map of the vast Solway site; you couldn't beat greaseproof paper and pencil for a replica diagram) had been entirely justified.   I heard first hand at just how dangerous the work had been and what the conditions were like for the unsophisticated girls who worked there. She remembered being thrilled with the visit of the King and Queen (George V and Mary; our current Queen's Grandparents) and was still proud of the contribution she'd made to the war effort. She's long gone now but I remember her with great affection......unlike Mr D, my J4 teacher!!\n\nAnyway, childhood disappointments aside, we parked up close to the cache and were surprised at just how busy the road was.  The cars fairly fly along so watch any little people or pets if you park where we did. The cache was soon found (loved the container) so we had plenty of time for a walk in the woods with Molly.  \n\nA super cache providing a lovely wander along memory lane and in the woods, thankyou!!<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"222266272\">\n          <groundspeak:date>2012-03-27T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"2903925\">jigglybones<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">What a difference a week or so makes. I returned to this cache on a pleasant spring day and didn't need to squelch through the mud this time. I spotted my tracks where I'd slid down the bank near the bridge though. Found the cache easily and what a cute container it is too! Loved reading all the information on the 'Devil's Porridge'. Thanks for the cache which was my 1100th.<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"220644682\">\n          <groundspeak:date>2012-03-24T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"2107474\">Free Timers<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Gosh, what a meal we made of finding this cache. It was a gloriously sunny, and warm, day as we pulled up off the main road, a la jigglybones,  and walked the 70 yards or so through the wood to the cache area. The gps was being a bit sluggish under the tree cover, but nevertheless we had a reasonable fix at the centre of a 10 yard circle. But, although we understood the hint, we just could not find the little blighter. After about half an hour of ever desperate and fanciful searching, we gave up and headed off to Talking Tarn for our walk. It was only on our return that we decided to give it another go and this time went straight to it. Sometimes there is no rationalising these things. Great description on the cache page of the munitions factory on this site. Who would have believed the scale of it. Also an excellent little cute cache container.<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"219104440\">\n          <groundspeak:date>2012-03-17T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Found it<\/groundspeak:type>\n          <groundspeak:finder id=\"2471849\">BigLad &amp; Co.<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">1922.\nWoooweee FTF!!!\nParked as suggested and enjoyed the short walk through the wood on this beautiful spring like morning.  Just a solo effort by BigLad today leaving the rest of the team to pour over their homework and chores.  Started to panic a touch at GZ as there were many hiding places even though I \"got\" the clue.  Mrs BL and the kids had visited the Devil's Porridge museum before, but I don't imagine that any knowledge gained would have helped with the find.  Found after a short search - loved the container, very apt indeed [:D]!\nThat's four FTF out of four on the CO's caches, however it looks as if the streak stops here as (speaking to the COs at this afternoon's event) the next one may be hidden in foreign lands [}:)].  Unless they were just pulling my leg [:D]\nTFTC.<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"219629758\">\n          <groundspeak:date>2012-03-16T19:00:00Z<\/groundspeak:date>\n          <groundspeak:type>Didn't find it<\/groundspeak:type>\n          <groundspeak:finder id=\"2903925\">jigglybones<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">I was heading home from work and suddenly a notification appeared for this cache (c 17.15). Surely, I could grab it quickly despite having to get home to Annan and get the 18.14 train to Dumfries for whisky tasting. \n\nI reversed into a handy spot just 80m from the cache and squelched along the path in a torrential downpour. Being Friday, the work clothes didn't really matter. Approaching the cache, I saw two deer who scarpered  quickly leaving me in isolation to find the cache. The rain was so hard, the touch screen phone seemed to be changing screens every time I held it out which hampered the find. After about 5 minutes I realised that the 'FTF' prize wasn't for me, so headed off to my whisky tasting.\n\nI met the CO the next day who gave me a big hint as to where the cache is.  I'll look harder next time!<\/groundspeak:text>\n        <\/groundspeak:log>\n        <groundspeak:log id=\"218813999\">\n          <groundspeak:date>2012-03-16T16:03:44Z<\/groundspeak:date>\n          <groundspeak:type>Publish Listing<\/groundspeak:type>\n          <groundspeak:finder id=\"4171383\">Royal Oak<\/groundspeak:finder>\n          <groundspeak:text encoded=\"False\">Published<\/groundspeak:text>\n        <\/groundspeak:log>\n      <\/groundspeak:logs>\n      <groundspeak:travelbugs>\n        <groundspeak:travelbug id=\"2853182\" ref=\"TB3GHR2\">\n          <groundspeak:name>CITO Micro Geocoin<\/groundspeak:name>\n        <\/groundspeak:travelbug>\n      <\/groundspeak:travelbugs>\n    <\/groundspeak:cache>\n  <\/wpt>\n  <wpt lat=\"54.999733\" lon=\"-3.020833\">\n    <time>2012-02-08T04:18:38.337<\/time>\n    <name>PK3C8Z9<\/name>\n    <cmt \/>\n    <desc>GC3C8Z9 Parking<\/desc>\n    <url>http:\/\/www.geocaching.com\/seek\/wpt.aspx?WID=40fb6ff9-96b1-4386-9e7b-bd3fea074483<\/url>\n    <urlname>GC3C8Z9 Parking<\/urlname>\n    <sym>Parking Area<\/sym>\n    <type>Waypoint|Parking Area<\/type>\n  <\/wpt>\n<\/gpx>";
    
});
