# D3. Moon Phases

 A D3.js stylish data-driven moon calendar project that displays the phases of the moon from my birth year of 1997 to the present day of 2022.

## Data and its collection

[Time and Date](https://www.timeanddate.com/moon/phases/?year=20229) was used to get the data from the moon phases. [Kalender-365](https://kalender-365.de/calendrier-lunaire.php) was used to confirm findings on the first site. I thus had to enter manually all the 4 phases of the moon, and the year, month and day they occured in a CSV file.

I also took note of the percentage of lighting the moon is recieving (0, 50, 100, -50), which I converted to a multiple of pi (0, 0.5, 1, 1.5). The CSV file was about 1'200 rows long.

I first tried to automate the display of the moon between the 4 phases, but soon realised the time between them was not regular; it could vary from 5 to 8 days in-between two phases. As such, I calculated by hand the multiples of pi for the moon in-between the 4 phases. All is put in the CSV file, on which I then iterate to display the lunar calendar for each months. In the end, pi multiples span from 0 to 1.999, and the CSV file is 9'496 rows long.
