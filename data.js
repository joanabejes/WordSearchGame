// letters to fill the board
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// words
const WORD_POOLS = {
    en: {
        easy: ["WATER", "RIVER", "CLOUD", "OCEAN", "EARTH", "GREEN", "PLANT", "ANIMAL", "BEACH",
            "FLOWER", "FOREST", "RABBIT", "GARDEN", "STORM", "SUN", "RAIN", "FISH", "TURTLE",
            "SHARK", "CORAL", "TREE", "LAKE", "WHALE", "SEAGULL", "SEAL"
        ],
        medium: ["RECYCLE", "CLIMATE", "WEATHER", "DESERT", "BIOME", "NATURE", "GLACIER",
            "VOLCANO", "PLASTIC", "HABITAT", "WILDLIFE", "SUNLIGHT", "BIOMASS", "ORGANIC",
            "POLLUTION", "EROSION", "LANDFILL", "PESTICIDE", "REUSE", "REDUCE", "COMPOST",
            "ENERGY", "SMOG", "HOMEING"
        ],
        hard: ["ECOSYSTEM", "ECOLOGY", "SUSTAINABLE", "GEOTHERMAL", "ECOCIDE", "DEGRADATION",
            "POLLUANT", "ENVIRONMENT", "RENEWABLE", "MICROPLASTIC", "ATMOSPHERE",
            "HYDROPOWER", "CONSERVATION", "RESPIRATION", "REFOREST","ENDEMISM",
            "CLIMATOLOGY", "OVERFISHING", "DESPOILMENT", "SALINIZATION", "GREENHOUSE",
            "EXTINCTION", "CARBONCRADLE", "AFFOREST", "BIOPIRACY", "WETLAND"
        ]

    },
    es: {
        easy: ["AGUA", "RIO", "NUBE", "OCEANO", "TIERRA", "VERDE", "PLANTA", "ANIMAL", "PLAYA",
            "FLOR", "BOSQUE", "CONEJO", "JARDIN", "TORMENTA", "SOL", "LLUVIA", "PEZ", "TORTUGA",
            "TIBURON", "CORAL", "ARBOL", "LAGO", "BALLENA", "GAVIOTA", "FOCA"
        ],
        medium: ["RECICLAR", "CLIMA", "TIEMPO", "DESIERTO", "BIOMA", "NATURALEZA", "GLACIAR",
            "VOLCAN", "PLASTICO", "HABITAT", "SILVESTRE", "LUZSOLAR","BIOMASA", "ORGANICO",
            "EROSION", "VERTEDERO", "PESTICIDA", "REUTILIZAR", "REDUCIR", "COMPOST", "ENERGIA",
            "BASURA", "FAUNA", "SUELO", "MONTANA", "PLANETA", "SEQUIA", "DERRAME", "INCENDIO"

        ],
        hard: ["ECOSISTEMA", "ECOLOGIA", "SOSTENIBLE", "GEOTERMICO", "ECOCIDIO", "DEGRADACION",
            "CONTAMINANTE", "AMBIENTE", "RENOVABLE", "ATMOSFERA", "CONSERVACION", "RESPIRACION",
            "REFORESTAR", "ENDEMISMO", "CLIMATOLOGIA", "SOBREPESCA", "DEPREDACION", "SALINIZACION",
            "INVERNADERO", "EXTINCION", "CARBONO", "BIOPIRATERIA", "HUMEDAL", "TOXICDAD", "CALENTAMIENTO",
            "INUNDACION", "PLAGAS", "NICHO", "FOTOSINTESIS", "GEOSFERA", "ACUIFERO", "CAPADEOZONO"
        ]

    },
    de: {
        easy: ["WASSER", "FLUSS", "WOLKE", "OZEAN", "ERDE", "GRUN", "PFLANZE", "TIER", "STRAND", "BLUME",
            "WALD", "GARTEN", "STURM", "SONNE", "REGEN", "FISCH", "HAI", "KORALLE", "BAUM", "SEE", "WAL",
            "MOWE", "ROBBE"
        ],
        medium: ["RECYCLELN", "KLIMA", "WETTER", "WUSTE", "BIOM", "NATUR", "GLETSCHER", "VULKAN", "KUNSTSTOFF",
            "LEBENSRAUM", "WILDNIS", "BIOMASSE", "ORGANISCH", "EROSION", "PESTIZID", "REDUZIEREN", "KOMPOST",
            "ENERGIE", "MULL", "TIERWELT", "BODEN", "BERG", "PLANET", "DURRE", "AUSLAUFEN", "BRAND"
        ],
        hard: ["OKOSYSTEM", "OKOLOGIE", "NACHHALTIG", "GEOTHERMISCH", "OKOZID", "DEGRADIERUNG", "UMWELT",
            "SCHADSTOFF", "ERNEUERBAR", "ATMOSPHARE", "ERHALTUNG", "ATMUNG", "ENDEMISMUS", "KLIMATOLOGIE",
            "UBERFISCHUNG", "PRADATION", "VERSALZUNG", "TREIBHAUS", "AUSSTERBEN", "KOHLENSTOFF", "BIOPIRATERIE",
            "FEUCHTGEBIET", "ERWARMUNG", "SCHADLINGE", "NISCHE", "GEOSPHARE", "AQUIFER", "OZONSCHINCHT"
        ]
    }
};

// hints for the hard mode
const HINTS = {
    en: {
        ECOSYSTEM: "Interacting biotic and abiotic components",
        ECOLOGY: "The science of organism-enviroment relationships",
        SUSTAINABLE: "Meeting the needs without compromising future generations",
        GEOTHERMAL: "Energy harnessed from Earth's internal heat",
        ECOCIDE: "Large-scale destruction of natural ecosystems",
        DEGRADATION: "The progressive decline of enviromental quality",
        POLLUANT: "An agent that contaminates a natural system",
        ENVIRONMENT: "External conditions influencing an organism's survival",
        RENEWABLE: "Naturally replenished within a relevant timescale",
        MICROPLASTIC: "Tiny synthetic fragments persisting in ecosystems",
        ATMOSPHERE: "The gaseous envelope surrounding a planet",
        HYDROPOWER: "Electricity generated through moving water",
        CONSERVATION: "Protecting biodiversity and natural resources",
        RESPIRATION: "Cellular processes that release usable energy",
        REFOREST: "To restore trees where forests once existed",
        ENDEMISM: "A species restricted to a particular region",
        CLIMATOLOGY: "The study of a long-term athmospheric patterns",
        OVERFISHING: "Harvesting aquatic populations faster than recovery",
        DESPOILMENT: "Severe destruction or depletion of landscapes",
        SALINIZATION: "Excessive salt accumulation in soil or water",
        GREENHOUSE: "A structure that traps heat for cultivation",
        EXTINCTION: "The irreversible disappearance of a species",
        CARBONCRADLE: "Carbon emissions associated with a product's beginning",
        AFFOREST: "To establish forest on previously unforested land",
        BIOPIRACY: "Unauthorized exploitation of biological resources or traditional knowledge",
        WETLAND: "An ecosystem shaped by persistent soil saturation"
    },
    es: {
        ECOSISTEMA: "Conjunto de organismos y factores físicos interdependientes",
        ECOLOGIA: "Ciencia que estuda las relaciones entre los seres vivos y su entorno",
        SOSTENIBLE: "Capaz de satisfacer necesidades presentes sin comprometer las futuras",
        GEOTERMICO: "Relacionado con el calor interno del planeta",
        ECOCIDIO: "Destrucción grave y extensa de los ecosistemas",
        DEGRADACION: "Deterioro progresivo de la calidad ambiental",
        CONTAMINANTE: "Agente que altera negativamente un medio natural",
        AMBIENTE: "Conjunto de condiciones que influyen en los organismos",
        RENOVABLE: "Recurso que se repone mediante procesos naturales",
        ATMOSFERA: "Envoltura gaseosa que rodea un planeta",
        CONSERVACION: "Protección de los recursos naturales y la biodiversidad",
        RESPIRACION: "Proceso celular mediante el qual se obtiene energía",
        REFORESTAR: "Recuperar la cobertura forestal de un terreno",
        ENDEMISMO: "Distribuicón exclusiva de una especie en una región",
        CLIMATOLOGIA: "Estudio de los patrones atmosféricos a largo plazo",
        SOBREPESCA: "Captura de peces a un ritmo superior a su recuperación",
        DEPREDACION: "Interacción en la que un organismo captura y consume otro",
        SALINIZACION: "Acumulación excessiva de sales en suelos o aguas",
        INVERNADERO: "Estructura que retiene calor para cultivar plantas",
        EXTINCION: "Desaparición definitia de una especie",
        CARBONO: "Elemento químico fundamental en la materia orgánica",
        BIOPIRATERIA: "Explotación indebida de recursos biológicos o saberes tradicionales",
        HUMEDAL: "Ecosistema caracterizado por suelos inundados o saturados",
        TOXICDAD: "Capacidad de una substancia para causar efectos nocivos",
        CALENTAMIENTO: "Aumento progresivo de la temperatura de un sistema",
        INUNDACION: "Ocupación de terrenos por agua normalmente ausente",
        PLAGAS: "Organismos que causan daños a cultivos o ecosistemas",
        NICHO: "Función ecológica y conjunto de condiciones de una especie",
        FOTOSINTESIS: "Conversión de energía luminosa en energía química",
        GEOSFERA: "Parte sólida del planeta, desde la superficie hasta su interior",
        ACUIFERO: "Formación geológica capaz de almacenar y transmitir agua subterránea",
        CAPADEOZONO: "Región atmosférica que absorbe gran parte de la radiación ultravioleta"
    },
    de: {
        OKOSYSTEM: "Zusammenspiel von Lebewesen und unbelebten Umweltfaktoren",
        OKOLOGIE: "Wissenschaft von den Beziehungen zwischen Organismen und ihrer Umwelt",
        NACHHALTIG: "Bedürfnisse erfüllen, ohne zukünftige Generationen zu gefährden",
        GEOTHERMISCH: "Die innere Wärme der Erde betreffend",
        OKOZID: "Schwerwiegende Zerströrung natürlicher Ökosysteme",
        DEGRADIERUNG: "Allmähliche Verschlechterung der Umweltqualität",
        UMWELT: "Gesamtheit der äußeren Bedingungen, die Lebewesen beeinflussen",
        SCHADSTOFF: "Substanz, die natürliche Systeme negativ beeinträchtigt",
        ERNEUERBAR: "Durch natürliche Prozesse wiederherstellbar",
        ATMOSPHARE: "Gasförmige Hülle, die einen Planeten umgibt",
        ERHALTUNG: "Schutz natürlicher Ressourcen und biologischer Vielfalt",
        ATMUNG: "Biologischer Prozess zur Energiegewinnung in Zellen",
        ENDEMISMUS: "Beschränkung einer Art auf ein bestimmtes geografisches Gebiet",
        KLIMATOLOGIE: "Wissenschaft von langfristigen klimatischen Mustern",
        UBERFISCHUNG: "Fischfang, der die natürliche Erholung der Bestände übersteigt",
        PRADATION: "Interaktion, bei der ein Organismus einen anderen erbeutet",
        VERSALZUNG: "Übermäßige Anreicherung von Salzen in Boden oder Wasser",
        TREIBHAUS: "Bauwerk, das Wärme für das Planzenwachstum speichert",
        AUSSTERBEN: "Endgültiges Verschwinden einer Art",
        KOHLENSTOFF: "Chemisches Element als Grundlage vieler organischer Verbindungen",
        BIOPIRATERIE: "Unrechtmäßige Aneingnung biologischer Ressourcen oder traditionellen Wissens",
        FEUCHTGEBIET: "Lebensraum, dessen Böden dauerhaft oder zeitweise wassergesättigt sind",
        ERWARMUNG: "Zunehmender Temperaturanstieg eines Systems",
        SCHADLINGE: "Organismen, die Kulturpflanzen oder Ökosysteme schädigen",
        NISCHE: "Funktion und Rolle einer Art innerhalb ihres Ökosystems",
        GEOSPHARE: "Fester Teil der Erde einschließlich ihres inneren Aufbaus",
        AQUIFER: "Geologische Formation, die Grundwasser speichert und weiterleitet",
        OZONSCHINCHT: "Atmosphärischer Bereich, der einen Großteil der UV-Strahlung absorbiert"

    }
};

// directions
const DIRECTIONS_EASY = [[0, 1], [1,0]]
const DIRECTIONS_FULL = [
    // right, down
    [0, 1], [1, 0],
    // left, up
    [0, -1], [-1,0],
    // diagonals going up
    [1, 1], [1, -1],
    // diagonals going down
    [-1, 1], [-1, -1]
];

// confetti
const CONFETTI_COLORS = [ "#4fc3f7", "#66bb6a", "#ffca28", "#ef5350", "#ab47bc", "#ffffff"];

// name generator
const ANIMALS = [
    { emoji: "🐬", word: "Dolphin" },
    { emoji: "🐢", word: "Turtle" },
    { emoji: "🦈", word: "Shark" },
    { emoji: "🐙", word: "Octopus" },
    { emoji: "🐠", word: "Fish" },
    { emoji: "🐳", word: "Whale" },
    { emoji: "🦀", word: "Crab" },
    { emoji: "🐡", word: "Puffer" },
    { emoji: "🐟", word: "Minnow" },
    { emoji: "🦑", word: "Squid" },
    { emoji: "🐚", word: "Shell" },
    { emoji: "🪼", word: "Jelly" },
    { emoji: "🦞", word: "Lobster" },
    { emoji: "⭐", word: "Star" },
    { emoji: "🐋", word: "Blue" }
];

const ADJECTIVES = [
    "Magic","Funny","Brave","Swift","Happy","Bright",
    "Clever","Wild","Calm","Bold","Lucky","Sunny",
    "Silent","Deep","Blue","Golden","Silver","Coral",
    "Ocean","Wave","Storm","Frost","Neon","Turbo"
];

//countries
const COUNTRIES = [
    { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" }, { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" },
    { code: "AU", name: "Australia" }, { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" }, { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" }, { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" }, { code: "BI", name: "Burundi" },
    { code: "CV", name: "Cabo Verde" }, { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" }, { code: "CA", name: "Canada" },
    { code: "CF", name: "Central African Republic" }, { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" }, { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo" }, { code: "CD", name: "Congo (DRC)" },
    { code: "CR", name: "Costa Rica" }, { code: "CI", name: "Côte d'Ivoire" },
    { code: "HR", name: "Croatia" }, { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" }, { code: "CZ", name: "Czechia" },
    { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" }, { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" }, { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" }, { code: "EE", name: "Estonia" },
    { code: "SZ", name: "Eswatini" }, { code: "ET", name: "Ethiopia" },
    { code: "FJ", name: "Fiji" }, { code: "FI", name: "Finland" },
    { code: "FR", name: "France" }, { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" }, { code: "GH", name: "Ghana" },
    { code: "GR", name: "Greece" }, { code: "GD", name: "Grenada" },
    { code: "GT", name: "Guatemala" }, { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" }, { code: "HN", name: "Honduras" },
    { code: "HU", name: "Hungary" }, { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" }, { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" }, { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" }, { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" }, { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" }, { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" }, { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" }, { code: "LA", name: "Laos" },
    { code: "LV", name: "Latvia" }, { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" }, { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libya" }, { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" }, { code: "LU", name: "Luxembourg" },
    { code: "MG", name: "Madagascar" }, { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" }, { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" }, { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" }, { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia" }, { code: "MD", name: "Moldova" },
    { code: "MC", name: "Monaco" }, { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" }, { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" }, { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" }, { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" }, { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" }, { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" }, { code: "NG", name: "Nigeria" },
    { code: "KP", name: "North Korea" }, { code: "MK", name: "North Macedonia" },
    { code: "NO", name: "Norway" }, { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" }, { code: "PW", name: "Palau" },
    { code: "PS", name: "Palestine" }, { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" }, { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" }, { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" }, { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" }, { code: "RW", name: "Rwanda" },
    { code: "KN", name: "Saint Kitts and Nevis" }, { code: "LC", name: "Saint Lucia" },
    { code: "VC", name: "Saint Vincent and the Grenadines" }, { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" }, { code: "ST", name: "São Tomé and Príncipe" },
    { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" }, { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" }, { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" }, { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" }, { code: "KR", name: "South Korea" },
    { code: "SS", name: "South Sudan" }, { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" }, { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" }, { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" }, { code: "SY", name: "Syria" },
    { code: "TW", name: "Taiwan" }, { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" }, { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" }, { code: "TG", name: "Togo" },
    { code: "TO", name: "Tonga" }, { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" }, { code: "TR", name: "Türkiye" },
    { code: "TM", name: "Turkmenistan" }, { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" }, { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" }, { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" }, { code: "VU", name: "Vanuatu" },
    { code: "VA", name: "Vatican City" }, { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" }, { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" }, { code: "ZW", name: "Zimbabwe" }
];