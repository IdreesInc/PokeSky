import { DataSet, englishDataset, parseRawPattern } from "obscenity";

// Not necessarily inappropriate, but in certain contexts can be part of NSFW posts. Sorry lads.
const BAD_WORDS = [
	"diaper",
	"diapers",
	"diapered",
	"pamp",
	"pamps",
	"pamped",
	"kink",
	"kinks",
	"kinky",
	"smell",
	"smelly",
	"nude",
	"nudes",
	"ai",
	"vore",
	"vores",
	"voring",
	"vored",
	"nsfw",
	"bimbo",
	"bimbos",
	"incontinent",
	"abdl",
	"paci",
	"pacis",
	"pacifier",
	"pacifiers",
	"footjob",
	"footjobs",
	"pawjob",
	"pawjobs",
	"chubby",
	"thigh",
	"thighs",
	"soggy",
	"fetish",
	"fetishes",
	"fetishy",
	"load",
	"loads",
	"pitjob",
	"pitjobs",
	"feral",
	"anthro",
	"breast",
	"breasts",
	"nipple",
	"nipples",
	"thighjob",
	"thighjobs",
	"smut",
	"smutty",
	"jerking",
	"daddy",
	"hole",
	"holes",
	"belly",
	"bellies",
];

const badWordsDataset = new DataSet<{ originalWord: string }>().addAll(
	englishDataset,
);
for (const word of BAD_WORDS) {
	badWordsDataset.addPhrase((phrase) =>
		phrase.addPattern(parseRawPattern("|" + word + "|")),
	);
}

export default badWordsDataset;
