window.exerciseData = {
  reading: {
    id: 'A2:reading:p1:1',
    level: 'A2',
    part: 'reading',
    title: 'Een bericht van de fietsenmaker',
    text: 'Beste mevrouw Bakker,\n\nUw fiets is klaar. U kunt hem vandaag tot 18.00 uur ophalen. Morgen zijn wij gesloten. Vanaf donderdag bent u weer welkom.\n\nDe reparatie kost 28 euro. U kunt met uw bankpas of contant betalen. Neem het bonnetje mee dat u kreeg toen u de fiets bracht. Bent u het bonnetje kwijt? Neem dan uw identiteitsbewijs mee.\n\nMet vriendelijke groet,\nFietsenwinkel De Hoek',
    questions: [
      {
        id: 'q1',
        skill: 'find_available_day',
        prompt: 'Mevrouw Bakker kan vandaag niet komen. Wanneer kan zij haar fiets ophalen?',
        options: {
          A: 'Morgen voor 18.00 uur.',
          B: 'Vanaf donderdag.',
          C: 'Alleen vandaag.',
        },
        answer: 'B',
        explanation: 'Morgen is de winkel gesloten. Vanaf donderdag kan mevrouw Bakker weer komen.',
        evidence: 'Morgen zijn wij gesloten. Vanaf donderdag bent u weer welkom.',
      },
      {
        id: 'q2',
        skill: 'understand_alternative',
        prompt: 'Mevrouw Bakker heeft haar bonnetje niet meer. Wat moet zij meenemen?',
        options: {
          A: 'Haar identiteitsbewijs.',
          B: 'Haar eigen fietssleutel.',
          C: 'Een foto van haar fiets.',
        },
        answer: 'A',
        explanation:
          'Wie het bonnetje kwijt is, moet volgens het bericht een identiteitsbewijs meenemen. Een sleutel of foto wordt niet genoemd als vervanging.',
        evidence: 'Bent u het bonnetje kwijt? Neem dan uw identiteitsbewijs mee.',
      },
    ],
    type: 'message',
    revision: 'c1:a8e80686a7f69c65',
  },
  listening: {
    id: 'A2:listening:tandarts:1',
    level: 'A2',
    part: 'listening',
    type: 'audio',
    title: 'Een bericht van de tandarts',
    text: 'Goedemorgen, u spreekt met de tandartspraktijk. Uw afspraak is donderdag om elf uur. Kunt u tien minuten eerder komen? Neem uw identiteitsbewijs mee. Tot donderdag.',
    audio: 'audio/d2b059fc991e45c9.mp3',
    duration: 12.486530612244898,
    peaks: [
      0.611, 0.521, 0.658, 0.443, 0.569, 0.414, 0.651, 0.566, 0.653, 0.674, 0.252, 0.341, 0.591,
      0.08, 0.08, 0.08, 0.08, 0.704, 0.529, 0.561, 0.362, 0.529, 0.76, 0.85, 0.631, 0.689, 0.409,
      0.792, 0.591, 0.52, 0.1, 0.08, 0.08, 0.08, 0.542, 0.217, 0.89, 0.437, 0.448, 0.469, 0.725,
      0.765, 0.08, 0.08, 0.08, 1, 0.595, 0.712, 0.262, 0.511, 0.312, 0.476, 0.314, 0.314, 0.08,
      0.08, 0.08, 0.677, 0.08, 0.711, 0.326, 0.336, 0.08, 0.08,
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Hoe laat moet u bij de praktijk zijn?',
        options: {
          A: 'Om 10.50 uur.',
          B: 'Om 11.00 uur.',
          C: 'Om 11.10 uur.',
        },
        answer: 'A',
        explanation: 'De afspraak is om elf uur. U moet tien minuten eerder komen: om 10.50 uur.',
        evidence: 'Uw afspraak is donderdag om elf uur. Kunt u tien minuten eerder komen?',
        questionAudio: 'audio/b1104a275059073e.mp3',
      },
    ],
    voice: 'ElevenLabs · Dutch',
    revision: 'c1:4aa652ec93e1dd75',
  },
  writing: {
    id: 'A2:writing:afspraak:1',
    part: 'writing',
    level: 'A2',
    title: 'Een afspraak verzetten',
    type: 'message',
    prompt:
      'U hebt morgen een afspraak met uw buurvrouw. U kunt niet komen. Schrijf haar een kort bericht.',
    criteria: [
      ['Zeg dat u niet kunt komen.', 'Say that you cannot come.'],
      ['Vertel waarom.', 'Give a reason.'],
      ['Stel een andere dag voor.', 'Suggest another day.'],
    ],
    sample: 'Ik kan morgen niet komen. Mijn kind is ziek.',
    quotes: ['Ik kan morgen niet komen.', 'Mijn kind is ziek.', null],
    model:
      'Beste buurvrouw, ik kan morgen niet komen. Mijn kind is ziek. Kan ik vrijdag komen? Groeten, Sara',
    revision: 'c1:b7763c8a945b845b',
  },
  sentence: {
    id: 'B1:writing:batch014-ziekmelding:1',
    level: 'B1',
    part: 'writing',
    exam: 'nt2-i',
    taskType: 'zinstaak',
    domain: 'werk',
    title: 'Ziekmelding bij de teamleider',
    status: 'ai-editorially-reviewed',
    targetLevelValidated: false,
    rubric: 'b1-schrijven',
    prompt: 'Maak de e-mail af. Maak de zin op de open plek af.',
    scaffold: {
      to: 's.bakker@meubelhuisdelinde.nl',
      from: 'kandidaat@mail.nl',
      subject: 'Ziekmelding',
      salutation: 'Beste mevrouw Bakker,',
      body: 'Vannacht ben ik ziek geworden en ik heb nog steeds koorts. Daarom ___. Mijn collega Karim weet welke klanten ik vandaag zou bellen. Morgen laat ik u weten of ik weer kan werken.',
      closing: 'Met vriendelijke groet,',
    },
    grammarTarget: 'inversie',
    adequacyNote:
      'Gevolg noemen: de schrijver komt vandaag niet werken, blijft thuis of meldt zich ziek.',
    criteria: [
      [
        'De zin geeft het gevolg van de ziekte: de schrijver komt vandaag niet werken (blijft thuis of meldt zich ziek).',
        'The sentence gives the consequence of the illness: the writer is not coming to work today (stays home or reports sick).',
      ],
      [
        "De zin heeft inversie na 'Daarom': eerst de persoonsvorm, dan het onderwerp.",
        "The sentence has inversion after 'Daarom': first the finite verb, then the subject.",
      ],
    ],
    sample: 'ik kan vandaag niet naar de werk komen',
    quotes: ['ik kan vandaag niet naar de werk komen', null],
    model: 'kan ik vandaag helaas niet naar mijn werk komen',
    revision: 'c1:010305f4ec7a82c8',
  },
  form: {
    id: 'A2:writing:batch008-lantaarnpaal:1',
    level: 'A2',
    part: 'writing',
    exam: 'duo-a2',
    taskType: 'form',
    domain: 'instanties',
    title: 'Melding: kapotte lantaarnpaal',
    status: 'ai-editorially-reviewed',
    targetLevelValidated: false,
    rubric: 'a2-schrijven',
    prompt:
      "De lantaarnpaal voor uw huis is kapot. Het licht doet het al een week niet. 's Avonds is het heel donker op straat. U meldt dit bij de gemeente. Vul het formulier in. Sommige gegevens moet u zelf bedenken.",
    formFields: [
      {
        label: 'Voor- en achternaam',
        kind: 'text',
      },
      {
        label: 'Adres',
        kind: 'text',
      },
      {
        label: 'Postcode',
        kind: 'text',
      },
      {
        label: 'Woonplaats',
        kind: 'text',
      },
      {
        label: 'Telefoonnummer',
        kind: 'text',
      },
      {
        label: 'E-mailadres',
        kind: 'text',
      },
      {
        label: 'Wat is het probleem?',
        kind: 'open',
      },
      {
        label: 'Waar is het probleem precies?',
        kind: 'open',
      },
      {
        label: 'Sinds wanneer is het probleem er?',
        kind: 'open',
      },
      {
        label: 'Hoe wilt u antwoord van de gemeente?',
        kind: 'choice',
        options: ['per telefoon', 'per e-mail', 'geen antwoord nodig'],
      },
    ],
    criteria: [
      ['Schrijf wat het probleem is.', 'Say what the problem is.'],
      ['Schrijf waar het probleem precies is.', 'Say exactly where the problem is.'],
      ['Schrijf sinds wanneer het probleem er is.', 'Say since when the problem has existed.'],
      ['Kies hoe u antwoord wilt.', 'Choose how you want to receive a reply.'],
    ],
    sample:
      "De lantaarnpaal voor mijn huis is kapot. Het licht doet het niet en het is 's avonds heel donker. De paal staat voor de Meidoornstraat 12, naast de bus halte. Ik wil antwoord per e-mail.",
    quotes: [
      "De lantaarnpaal voor mijn huis is kapot. Het licht doet het niet en het is 's avonds heel donker.",
      'De paal staat voor de Meidoornstraat 12, naast de bus halte.',
      null,
      'Ik wil antwoord per e-mail.',
    ],
    model:
      "De lantaarnpaal voor mijn huis is kapot. Het licht gaat 's avonds niet aan. Daardoor is het heel donker op straat. De paal staat voor Meidoornstraat 12 in Hoorn, naast de bushalte. Het licht doet het sinds maandag 28 september niet meer. Ik wil graag antwoord per e-mail.",
    revision: 'c1:c94f9f44f1fa7466',
  },
  speaking: {
    id: 'A2:speaking:buurvrouw:1',
    part: 'speaking',
    level: 'A2',
    title: 'Bel uw buurvrouw',
    type: 'message',
    prompt: 'U kunt morgen niet naar uw buurvrouw. Spreek een kort bericht in.',
    criteria: [
      ['Zeg dat u niet kunt komen.', 'Say that you cannot come.'],
      ['Vertel waarom.', 'Give a reason.'],
      ['Stel een andere dag voor.', 'Suggest another day.'],
    ],
    sample: 'Ik kan morgen niet komen. Mijn kind is ziek.',
    quotes: ['Ik kan morgen niet komen.', 'Mijn kind is ziek.', null],
    model: 'Hallo, ik kan morgen niet komen. Mijn kind is ziek. Kan ik vrijdag komen?',
    revision: 'c1:48baad032e6f965a',
  },
  pictures: {
    id: 'A2:speaking:batch009-paspoort:1',
    level: 'A2',
    part: 'speaking',
    exam: 'duo-a2',
    taskType: 'picture-sequence',
    domain: 'instanties',
    title: 'Fatima haalt een nieuw paspoort',
    status: 'ai-editorially-reviewed',
    targetLevelValidated: false,
    rubric: 'a2-spreken',
    speakingSeconds: 40,
    prepSeconds: 10,
    prompt:
      'Fatima heeft een nieuw paspoort nodig. Kijk naar de plaatjes. Vertel wat Fatima doet. Vertel iets over alle plaatjes.',
    images: [
      {
        brief:
          'Fatima (woman in her forties, headscarf, blue coat) sits on a stool in a small photo studio while a photographer with a camera on a tripod takes her picture against a plain light background. No text.',
        alt: 'Een vrouw laat een pasfoto maken bij een fotograaf.',
        kind: 'drawing',
        size: 'sequence',
        file: 'images/576506400d4e6de6.webp',
      },
      {
        brief:
          'Fatima (woman in her forties, headscarf, blue coat) stands at a counter in a town hall and hands a form and a small photo to an employee behind the desk. No text.',
        alt: 'Een vrouw geeft papieren af aan een balie.',
        kind: 'drawing',
        size: 'sequence',
        file: 'images/3e7421db3ee0eddf.webp',
      },
      {
        brief:
          'Fatima (woman in her forties, headscarf, blue coat) stands at the same town-hall counter; the employee hands her a small dark-red booklet and Fatima smiles. No text.',
        alt: 'Een vrouw krijgt een klein boekje aan de balie.',
        kind: 'drawing',
        size: 'sequence',
        file: 'images/e52169e3eb8f0ae9.webp',
      },
    ],
    criteria: [
      [
        'Vertel wat Fatima op het eerste plaatje doet.',
        'Say what Fatima does in the first picture.',
      ],
      [
        'Vertel wat Fatima op het tweede plaatje doet.',
        'Say what Fatima does in the second picture.',
      ],
      [
        'Vertel wat Fatima op het derde plaatje doet.',
        'Say what Fatima does in the third picture.',
      ],
    ],
    sample: 'Eerst laat Fatima een foto maken. Daarna krijgt ze haar paspoort bij de gemeente.',
    quotes: [
      'Eerst laat Fatima een foto maken.',
      null,
      'Daarna krijgt ze haar paspoort bij de gemeente.',
    ],
    model:
      'Op het eerste plaatje laat Fatima een pasfoto maken bij een fotograaf. Op het tweede plaatje is ze bij de gemeente. Ze geeft een formulier en de foto aan de medewerker. Op het derde plaatje haalt ze haar nieuwe paspoort op. Ze is blij.',
    revision: 'c1:c47e3683f7c7807a',
    promptAudio: 'audio/027b7810908fa25c.mp3',
  },
  knm: {
    id: 'A2:knm:batch006-diplomawaardering:1',
    level: 'A2',
    part: 'knm',
    exam: 'knm',
    taskType: 'feit',
    domain: 'werk',
    theme: 1,
    eindterm: '1.1.4',
    title: 'Diplomawaardering',
    text: 'Een diplomawaardering vergelijkt een buitenlands diploma met een Nederlands diploma. Zo weet een werkgever wat het diploma hier waard is.',
    questions: [
      {
        id: 'q1',
        skill: 'rule-application',
        prompt: 'Karim heeft een diploma uit zijn land. Wat is een diplomawaardering?',
        options: {
          A: 'Een vergelijking met een Nederlands diploma.',
          B: 'Een officiële vertaling van het diploma.',
          C: 'Een nieuw examen op een Nederlandse school.',
        },
        answer: 'A',
        evidence: 'vergelijkt een buitenlands diploma met een Nederlands diploma',
        explanation:
          'Een diplomawaardering zegt met welk Nederlands diploma het buitenlandse diploma vergelijkbaar is. Het is geen vertaling en geen nieuw examen.',
        questionAudio: 'audio/8d8e3f77b36c1620.mp3',
      },
    ],
    sourceUrl:
      'https://www.rijksoverheid.nl/vraag-en-antwoord/onderwijs-en-internationalisering/hoe-laat-ik-mijn-buitenlandse-diploma-in-nederland-waarderen-of-erkennen',
    sourceNote:
      'Rijksoverheid: a diplomawaardering describes which Dutch programme or diploma a foreign diploma is comparable to; drawn up by the expertisecentra SBB and Nuffic (IDW). Structural fact; only the names of the organisations could change.',
    sourceReviewedAt: '2026-09-10',
    status: 'ai-editorially-reviewed',
    targetLevelValidated: false,
    revision: 'c1:cb46072aaa9bb17c',
    images: [
      {
        file: 'images/168027379e83af3d.webp',
        alt: 'Karim zit aan een tafel met een opgerold document in zijn hand.',
        kind: 'drawing',
        brief:
          'Karim (man in his thirties, short black hair and beard, grey jacket) sitting at a desk at home, holding a rolled document with a ribbon, a laptop open beside him; no readable text.',
      },
    ],
  },
};
