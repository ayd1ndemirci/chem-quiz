import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

class Compound {
    constructor(public name: string, public formula: string) {}
}

class CompoundCollection {
    compounds: Compound[];

    constructor() {
        this.compounds = [
            new Compound("Hidroflorik Asit", "HF"),
            new Compound("Sülfürik Asit", "H2SO4"),
            new Compound("Asetik Asit", "CH3COOH"),
            new Compound("Fosforik Asit", "H3PO4"),
            new Compound("Karınca Asidi", "HCOOH"),
            new Compound("Amonyak", "NH3"),
            new Compound("Sodyum Klorür", "NaCl"),
            new Compound("Kalsiyum Karbonat", "CaCO3"),
            new Compound("Magnezyum Hidroksit", "Mg(OH)2"),
            new Compound("Nitrik Asit", "HNO3"),
            new Compound("Hidroklorik Asit", "HCl"),
            new Compound("Sodyum Hidroksit", "NaOH"),
            new Compound("Potasyum Permanganat", "KMnO4"),
            new Compound("Amonyum Sülfat", "NH4)2SO4"),
            new Compound("Karbonik Asit", "H2CO3"),
            new Compound("Sülfür Dioksit", "SO2"),
            new Compound("Azot Dioksit", "NO2"),
            new Compound("Etil Alkol", "C2H5OH"),
            new Compound("Metanol", "CH3OH"),
            new Compound("Aseton", "(CH3)2CO"),
            new Compound("Sodyum Bikarbonat", "NaHCO3"),
            new Compound("Sodyum Sülfat", "Na2SO4"),
            new Compound("Kalsiyum Sülfat", "CaSO4"),
            new Compound("Magnesium Sülfat", "MgSO4"),
            new Compound("Alüminyum Oksit", "Al2O3"),
            new Compound("Karbon Dioksit", "CO2"),
            new Compound("Azot", "N2"),
            new Compound("Oksijen", "O2"),
            new Compound("Su", "H2O"),
            new Compound("Kalsiyum Asetat", "Ca(C2H3O2)2"),
            new Compound("Sodyum Nitrat", "NaNO3")
        ];
    }

    getRandomElements(count: number): Compound[] {
        const shuffled = [...this.compounds].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    generateQuestion(): { question: string, answers: string[], correctAnswer: string } {
        const mode = Math.random() < 0.5 ? "nameToFormula" : "formulaToName";
        const correct = this.compounds[Math.floor(Math.random() * this.compounds.length)];
        const wrongs = this.getRandomElements(4).filter(c => c !== correct);
        const options = this.getRandomElements(5);

        const question = mode === "nameToFormula"
            ? `"${correct.name}" bileşiğinin formülü nedir?`
            : `"${correct.formula}" bileşiğinin yaygın adı nedir?`;

        const answers = options.map((opt) =>
            mode === "nameToFormula" ? opt.formula : opt.name
        );

        const correctAnswer = mode === "nameToFormula" ? correct.formula : correct.name;

        return { question, answers, correctAnswer };
    }
}

const compoundCollection = new CompoundCollection();

app.get('/generate-question', (req, res) => {
    const { question, answers, correctAnswer } = compoundCollection.generateQuestion();
    res.json({ question, answers, correctAnswer });
});

app.listen(PORT, () => {
    console.log(`ChemQuiz server running at http://localhost:${PORT}`);
});
