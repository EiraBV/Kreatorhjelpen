// De siste seks ukene, eldst først. Tallene er faste for prototypen.
// Trender som går igjen over flere uker har samme id, så «Gjør om til idé»
// husker at den allerede er lagt i Idébanken. «kilde» er navnet i kilder.js.

export const uker = [
  {
    uke: 40,
    start: '2026-09-28',
    slutt: '2026-10-04',
    tall: { kontakter: 5, innhold: 3, nyeIdeer: 4, lagredeIdeer: 1 },
    trender: [
      { id: 401, tittel: 'Oktoberfest hjemme', kategori: 'Brygging', plattform: 'Instagram', beskrivelse: 'Bilder av hjemmebrygget märzen og bord dekket med pretzels og pølser. Mye fokus på utstyr og stemning.', utvikling: 'Stigende', kilde: 'Hjemmebryggerforum' },
      { id: 402, tittel: 'Pizza med skogsopp', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Kantarell og traktkantarell fra soppturen rett på pizzaen, gjerne med hvit bunn og timian.', utvikling: 'Ny', kilde: 'Steinovnsklubben' },
      { id: 403, tittel: 'Viltburger på grillen', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Elg- og hjortekjøtt fra jakten blir til burgere. Seerne spør mye om fettinnhold og steketid.', utvikling: 'Stigende', kilde: 'Grillskolen' },
      { id: 404, tittel: 'Siste grillkveld ute', kategori: 'BBQ', plattform: 'TikTok', beskrivelse: 'Korte klipp fra den siste grillkvelden før høsten tar over, med pledd og lykter.', utvikling: 'Stabil', kilde: 'Matrøyk' },
    ],
  },
  {
    uke: 41,
    start: '2026-10-05',
    slutt: '2026-10-11',
    tall: { kontakter: 7, innhold: 5, nyeIdeer: 3, lagredeIdeer: 2 },
    trender: [
      { id: 411, tittel: 'Brygging med fersk humle', kategori: 'Brygging', plattform: 'YouTube', beskrivelse: 'Humlesesongen er over, og flere viser hvordan de bruker nyhøstet humle fra egen hage.', utvikling: 'Stigende', kilde: 'Hjemmebryggerforum' },
      { id: 402, tittel: 'Pizza med skogsopp', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Fortsatt populært mens soppsesongen varer. Flere kombinerer sopp med karamellisert løk.', utvikling: 'Stabil', kilde: 'Steinovnsklubben' },
      { id: 412, tittel: 'Pizzadeig med surdeig', kategori: 'Pizza', plattform: 'TikTok', beskrivelse: 'Kaldhevet surdeigsdeig over flere døgn, vist dag for dag.', utvikling: 'Ny', kilde: 'Steinovnsklubben' },
      { id: 413, tittel: 'Kyllingvinger til kampkvelden', kategori: 'BBQ', plattform: 'TikTok', beskrivelse: 'Røykte vinger med ulike glaseringer, laget til fotballkveld med venner.', utvikling: 'Stigende', kilde: 'Matrøyk' },
      { id: 403, tittel: 'Viltburger på grillen', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Jaktsesongen gir fortsatt mange videoer om viltkjøtt på grillen.', utvikling: 'Stabil', kilde: 'Grillskolen' },
    ],
  },
  {
    uke: 42,
    start: '2026-10-12',
    slutt: '2026-10-18',
    tall: { kontakter: 4, innhold: 6, nyeIdeer: 5, lagredeIdeer: 2 },
    trender: [
      { id: 421, tittel: 'Mørkt høstøl og stout', kategori: 'Brygging', plattform: 'Instagram', beskrivelse: 'Mørke ølstiler med kaffe- og sjokoladetoner. Mange viser fram fargen i glasset ved peisen.', utvikling: 'Stigende', kilde: '#juleøl' },
      { id: 422, tittel: 'Gresskarpizza', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Bakt gresskar, salvie og geitost på pizza. Mye fargerike bilder fra steinovnen.', utvikling: 'Ny', kilde: 'Steinovnsklubben' },
      { id: 423, tittel: 'Røykt gresskar og rotgrønnsaker', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Grønnsaker i røykovn som tilbehør til høstmiddagen. Tresorter og tid er det mange spør om.', utvikling: 'Ny', kilde: 'Grillskolen' },
      { id: 413, tittel: 'Kyllingvinger til kampkvelden', kategori: 'BBQ', plattform: 'TikTok', beskrivelse: 'Fortsatt mange klipp med vinger og dipper til helgens kamper.', utvikling: 'Stabil', kilde: 'Matrøyk' },
    ],
  },
  {
    uke: 43,
    start: '2026-10-19',
    slutt: '2026-10-25',
    tall: { kontakter: 8, innhold: 4, nyeIdeer: 7, lagredeIdeer: 3 },
    trender: [
      { id: 1, tittel: 'Juleøl brygget hjemme', kategori: 'Brygging', plattform: 'YouTube', beskrivelse: 'De første juleølene settes nå, så de rekker å modne til jul. Mange deler krydderlister og tidsplaner.', utvikling: 'Ny', kilde: 'Hjemmebryggerforum' },
      { id: 421, tittel: 'Mørkt høstøl og stout', kategori: 'Brygging', plattform: 'Instagram', beskrivelse: 'Mørke ølstiler holder seg godt mens kveldene blir lengre.', utvikling: 'Stabil', kilde: '#juleøl' },
      { id: 431, tittel: 'Halloween-pizza', kategori: 'Pizza', plattform: 'TikTok', beskrivelse: 'Pizza formet som gresskar og spøkelser, populært blant barnefamilier før halloween.', utvikling: 'Stigende', kilde: 'Steinovnsklubben' },
      { id: 422, tittel: 'Gresskarpizza', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Gresskar på pizza fortsetter, nå oftere med chili og honning.', utvikling: 'Stabil', kilde: 'Steinovnsklubben' },
      { id: 432, tittel: 'Pinnekjøtt i røykovn', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Noen tester pinnekjøtt i røykovn i god tid før jul, med mye diskusjon om tradisjon og smak.', utvikling: 'Ny', kilde: 'Grillskolen' },
    ],
  },
  {
    uke: 44,
    start: '2026-10-26',
    slutt: '2026-11-01',
    tall: { kontakter: 6, innhold: 6, nyeIdeer: 6, lagredeIdeer: 1 },
    trender: [
      { id: 1, tittel: 'Juleøl brygget hjemme', kategori: 'Brygging', plattform: 'YouTube', beskrivelse: 'Flere deler oppskrifter på mørke juleøl med krydder som kanel og stjerneanis.', utvikling: 'Stigende', kilde: 'Hjemmebryggerforum' },
      { id: 431, tittel: 'Halloween-pizza', kategori: 'Pizza', plattform: 'TikTok', beskrivelse: 'Toppen nås i halloween-helgen, med mange klipp fra pizzakvelder med barna.', utvikling: 'Stabil', kilde: 'Steinovnsklubben' },
      { id: 3, tittel: 'Pizza med høstgrønnsaker', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Gresskar, rosenkål og sopp på hvit bunn begynner å dukke opp i feeden.', utvikling: 'Ny', kilde: 'Steinovnsklubben' },
      { id: 5, tittel: 'Røykt juleribbe', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'De første videoene om ribbe i røykovn før den får sprø svor i ovnen.', utvikling: 'Ny', kilde: 'Grillskolen' },
      { id: 432, tittel: 'Pinnekjøtt i røykovn', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Interessen holder seg, med flere som sammenligner med tradisjonell damping.', utvikling: 'Stabil', kilde: 'Grillskolen' },
    ],
  },
  {
    uke: 45,
    start: '2026-11-02',
    slutt: '2026-11-08',
    tall: { kontakter: 9, innhold: 4, nyeIdeer: 6, lagredeIdeer: 3 },
    trender: [
      { id: 1, tittel: 'Juleøl brygget hjemme', kategori: 'Brygging', plattform: 'YouTube', beskrivelse: 'Flere deler oppskrifter på mørke juleøl med krydder som kanel og stjerneanis. Rommet for å vise tid og tålmodighet er stort.', utvikling: 'Stigende', kilde: 'Hjemmebryggerforum' },
      { id: 2, tittel: 'Etiketter til juleølet', kategori: 'Brygging', plattform: 'Instagram', beskrivelse: 'Hjemmelagde etiketter og gavepakking av flasker. Et godt alternativ der ølet selv ikke står i sentrum.', utvikling: 'Ny', kilde: '#juleøl' },
      { id: 3, tittel: 'Pizza med høstgrønnsaker', kategori: 'Pizza', plattform: 'Instagram', beskrivelse: 'Gresskar, rosenkål og sopp på hvit bunn. Mange deler bilder rett fra steinovnen med fokus på farger.', utvikling: 'Stigende', kilde: 'Steinovnsklubben' },
      { id: 4, tittel: 'Pizzakveld inne når det blir kaldt', kategori: 'Pizza', plattform: 'TikTok', beskrivelse: 'Korte klipp om å få god pizza i vanlig stekeovn med stål eller stein. Populært nå som utesesongen er over.', utvikling: 'Stabil', kilde: 'Steinovnsklubben' },
      { id: 5, tittel: 'Røykt juleribbe', kategori: 'BBQ', plattform: 'YouTube', beskrivelse: 'Ribbe tilberedt i røykovn før den får sprø svor i ovnen. Mange spør om tresorter og temperatur.', utvikling: 'Stigende', kilde: 'Grillskolen' },
      { id: 6, tittel: 'Vintergrilling på balkongen', kategori: 'BBQ', plattform: 'TikTok', beskrivelse: 'Grilling i kulde og mørke, med tips om lys, vindskjerm og å holde jevn varme.', utvikling: 'Ny', kilde: 'Matrøyk' },
    ],
  },
]
