// onionring.js is made up of four files - onionring-widget.js, onionring-index.js, onionring-variables.js (this one!), and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// === ONIONRING-VARIABLES ===
//this file contains the stuff you edit to set up your specific webring

//the full URLs of all the sites in the ring
var sites = [
'https://cabbagesorter.net/',
'https://22yk01.neocities.org/',
'https://vencake.neocities.org/',
'https://vivarism.net/',
'https://alcedonia.neocities.org/',
'https://daughterofbilitis.neocities.org/',
'https://vaultofsky.neocities.org/',
'https://sylum.web.fc2.com/',
'https://sephiria.com/',
'https://www.virtuagirl.net/',
'https://lukovrurshldr.neocities.org/',
'https://ge.silentears.net/',
'https://snags.silentears.net/',
//'https://valentines.neocities.org/', -missing navigation
'https://merrin.neocities.org/',
'https://sleepy-sage.neocities.org/',
'https://lsiekiera.neocities.org/',
//'https://middlepot.com/', - inactive
'https://moonie.neocities.org/',
'https://shakerbox.neocities.org/',
'https://www.nickifaulk.com/',
'https://lostlove.neocities.org/',
'https://paz01997.neocities.org/',
'https://censorine.com/',
'https://kawaii-sho.blogspot.com/',
'https://www.nowwerecookin.org/',
'https://fin600.neocities.org/',
'https://noitar-arat.neocities.org/',
'https://bbstar.neocities.org/',
'https://iwillneverbehappy.neocities.org/',
'https://crossroads.cx/',
'https://kotteism.neocities.org/',
'https://travelinghealer.teacake.org/',
'https://angeleyesprings.neocities.org/',
'https://thecozy.cat/',
'https://fustilugz.neocities.org/',
'https://girlinside.neocities.org/',
'https://reibi.party/',
'https://binnsbin.neocities.org/',
'https://lazer-bunny.neocities.org/',
// 'http://jeansgurl98.com/', - missing navigation
'https://cyberstheb.neocities.org/',
'https://multohhh.neocities.org/',
'https://cherrysoda.nu',
'https://runjumpreviews.neocities.org/', 
'https://bungle.online',
'https://262ravens.neocities.org/',
'https://exulansis.neocities.org/',
'https://sneerful.neocities.org',
'https://rabbitgambit.neocities.org/',
'https://averageshrimp.neocities.org/',
'https://midnight-cloud.net/',
'https://amalinalai.github.io/precipice/',
'https://sonechka.bouvardia.blue/',
'https://bbblog.haliya.net/',
'https://cyberpeach.net',
'https://elenzer.neocities.org',
'https://digipiixie.com/',
'https://moeghosts.neocities.org',
'https://prismatic.pink/',
'https://angeldolly.com/',
'https://howsoonisnow.org',
'https://snowvalley.online',
'https://myamopod.my/',
'https://demisdesignart.neocities.org/',
'https://bibineko.neocities.org/',
'https://kwaamfan.haliya.net/',
'https://chione.neocities.org',
'https://chela.neocities.org/',
'https://valkyrias-hideout-art.neocities.org/',
'https://sodabubble.neocities.org/',
'https://cellula.neocities.org/',
'https://millacat3.nekoweb.org/',
'https://rosevoid.neocities.org/',
'https://thematildenet.nekoweb.org/',
'https://shanghairomance.neocities.org/',
'https://badfaith.neocities.org/',
'https://firebaseripcord.lol/',
'https://kimberlygb.nekoweb.org/',
'https://starfrost-spire.neocities.org/',
'https://everoesea.neocities.org/',
'https://necogutz.neocities.org/',
'https://localangel.nekoweb.org/',
'https://codewire.neocities.org/', 
'https://deathgrind.neocities.org',
'https://luarisada.neocities.org/',
'https://tuesdaynight.blog/',
'https://reij.neocities.org/',
'https://frilleffect.neocities.org/',
'https://brittanymarie.neocities.org/',
'https://cherealbox.neocities.org/',
'https://loreleice.net/',
'https://holloetc.neocities.org/',
'https://justpeachy26.neocities.org',
'https://tiny-leaf.neocities.org/', 
'https://voxelcity.neocities.org', 
'https://whispurra.nekoweb.org/',
'https://prudas.lt/',
'https://thegreatpretender02.neocities.org',
'https://chilblands.neocities.org/',
'https://midnight-fireworks-art.neocities.org/',
'https://soap11111111.github.io/1/',
'https://kidzombie.online/',
'https://junai.neocities.org/',
'https://morningdovesnest.neocities.org/',
//'https://kolyskova85.neocities.org/', - missing navigation but links to the site
'https://maccadot.neocities.org/',
'https://bessiebea.neocities.org/',
'https://nostalgiamoon.neocities.org/',
'https://fantasmagoria.neocities.org/',
'https://episode83.neocities.org/',
'https://love2love.neocities.org/',
'https://www.lislecoombs.me/',
'https://meerkatlyn.nekoweb.org/',
'https://lifedesa.neocities.org/',
'https://esoterical.org/',
'https://chainless.nekoweb.org/',
'https://batqualia.neocities.org',
'https://closedeyesoflove.neocities.org/',
'https://coffbeanie.neocities.org/',
'https://dudutrys.neocities.org/',
'https://wavecdansel.neocities.org/',
'https://sheeeeebukiiiii.neocities.org/',
'https://hamsteria.neocities.org/',
'https://rose.arceus.day',
'https://orcareon.neocities.org/',
//'https://lindley.land/', - missing widget
'https://scribblypam.bearblog.dev/',
'https://materialfem.nekoweb.org/',
'https://monamies.neocities.org/',
'https://keeeok.neocities.org/',
'https://bribribribribri.xyz/',
'https://shades-of-serenity.neocities.org/'
];

//the name of the ring
var ringName = 'Women of the Internet';

/* the unique ID of the widget. two things to note:
 1) make sure there are no spaces in it - use dashes or underscores if you must
 2) remember to change 'webringid' in the widget code you give out and all instances of '#webringid' in the css file to match this value!*/
var ringID = 'women-web';

//should the widget include a link to an index page?
var useIndex = false;
//the full URL of the index page. if you're not using one, you don't have to specify anything here
var indexPage = 'https://womenoftheinternet.neocities.org/';

//should the widget include a random button?
var useRandom = true;
