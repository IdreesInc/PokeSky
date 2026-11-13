import { DataSet, englishDataset, parseRawPattern } from "obscenity";

// Not necessarily inappropriate, but in certain contexts can be part of NSFW posts. Sorry lads.
const BAD_WORDS = [
	"diaper",
	"diapers",
	"diapered",
	"kink",
	"kinks",
	"kinky",
	"smell",
	"smelly",
	"nude",
	"ai",
	"vore",
	"vores",
	"voring",
	"nsfw",
	"bimbo",
	"bimbos",
	"incontinent",
	"abdl",
	"paci",
	"pacifier",
	"footjob",
	"chubby",
	"thigh",
	"thighs",
	"soggy",
	"fetish",
	"fetishes",
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
	"smut",
	"jerking",
	"daddy",
	"hole",
	"holes",
	"belly",
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
