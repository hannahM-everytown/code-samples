Weather Coding Exercise

At various points in this coding exercise you will be asked to copy a snapshot of your work into its own directory. The goal is to see how you got to various points before you are asked to make further changes to them for later parts of the exercise.

Bear in mind:
Aesthetics: Don't worry about how it looks. You'd likely build something prettier given time but we're not asking for that.
Comments: Feel free to add explanations where you make assumptions or feel the code in-itself isn't obvious.
Plain Javascript: Do not use jQuery or any other framework.

Part 1: Weather for Palo Alto

Download the zip file which contains the basic folder structure and a started index.html file.

https://www.dropbox.com/s/rklfjwt2756ymp3/weather-coding-exercise.zip?dl=0

I have an empty web page with basic HTML. I want to display the current weather conditions for Palo Alto and the forecast for the next few days. 

Data Source:
https://www.sfchronicle.com/external/weather/weather.json?callback=hdnWeatherJsonpCallback

We are asking you to:
Write the necessary code to load the data source in a reliable manner.
Loading weather data should be initiated and triggered using Javascript.
You should not load a local copy of the data source.
Using the data, find the entry for "Palo Alto".
Render the basic HTML to provide the "current" weather conditions in "Palo Alto" in the DIV with the id "current"
Output the current temperature ("temp" ) with the Degrees symbol
Output the current condition ("condition")
Render the basic HTML for each day of the "weekly" forecast.
For each day, output the name of the day ("day") and the condition ("condition").

Once you are done and happy with your code (and have added in any comments), please copy the contents of the "part-1" folder to "part-2" and move to the next step.

Part 2: Weather for many cities

Taking your previous code, we're going to ask for the following features and changes:

Add some basic CSS rules to style to tidy up the layout.
We're expecting mostly font-sizes, margins, paddings, borders. 
Anything more than that is unnecessary.
We want to allow the user to change the city from 'Palo Alto' to something else.
In the DIV with the ID "menu", add an empty drop-down element.
When the weather data has loaded, update the drop-down item to have a list of all the available cities in the data.
The drop-down should default to the currently displayed city ('Palo Alto' in this case) 
When the user chooses a different city, the HTML should update to reflect the current conditions and forecast for that city. 
Bonus: 
If the current local time is between 8pm and 8am, add a class to the BODY tag that says "darkmode" and using that, have CSS rules that invert the colors for the "current" DIV.

Once you are done and happy with your code (and have added in any comments), please copy the contents of the "part-2" folder to "part-3" and move to the next step.

Part 3: Final Round

We know you're doing this test on your own time and we don't want to overdo it. With that in mind feel free to answer in comments if you don't have time to implement features.

Taking your previous code, we're going to ask for the following features and changes:

How would you update your code so...

If a user refreshed the page, we would not need to load the weather data again unless 10 minutes had elapsed?
If the user left the page open all day, the page will update the weather data every 10 minutes?
Instead of the abbreviated days ("Mon", "Tues", etc) we had full names ("Monday", "Tuesday", etc)?
Given that in the data the icon (example: "mostlycloudy") refers to an image path "/not/really/a/thing/mostlycloud.png", could you render HTML to display the weather icons for each entry?
What other improvements do you think should be made if you had more time?

And you're done!



