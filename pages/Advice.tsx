import React from 'react';
import { ShieldAlert, Lock, UserCheck, Eye, Smartphone, Globe } from 'lucide-react';

const Advice: React.FC = () => {
  const tips = [
    {
      icon: Lock,
      title: "Umuhimu wa Nenosiri Kali",
      color: "bg-blue-100 text-blue-600",
      content: "Nenosiri ndio mstari wako wa kwanza wa ulinzi. Nenosiri kali linapaswa kuwa na angalau herufi 12, likichanganya herufi kubwa, ndogo, nambari na alama maalum. Epuka kutumia majina yako, tarehe za kuzaliwa, au maneno rahisi kukisiwa kama '123456'."
    },
    {
      icon: ShieldAlert,
      title: "Hatari ya Kurudia Nenosiri",
      color: "bg-red-100 text-red-600",
      content: "Ikiwa unatumia nenosiri moja kwa akaunti zote, mdukuzi akipata nenosiri moja, atapata uwezo wa kuingia kwenye akaunti zako zote ikiwemo benki na barua pepe. Kila akaunti inapaswa kuwa na nenosiri la kipekee."
    },
    {
      icon: UserCheck,
      title: "Uthibitishaji wa Hatua Mbili (2FA)",
      color: "bg-green-100 text-green-600",
      content: "Washa 2FA (Two-Factor Authentication) popote inapowezekana. Hii inaongeza safu ya ulinzi ambapo utahitaji msimbo unaotumwa kwa simu yako baada ya kuweka nenosiri. Hata kama mtu anajua nenosiri lako, hataweza kuingia bila simu yako."
    },
    {
      icon: Eye,
      title: "Jinsi ya Kukaa Salama Mtandaoni",
      color: "bg-purple-100 text-purple-600",
      content: "Kuwa mwangalifu na viungo (links) unavyofungua kwenye barua pepe au SMS. Wadukuzi hutumia mbinu ya 'Phishing' kuiba taarifa zako kwa kujifanya ni kampuni halali. Angalia vizuri anwani ya tovuti kabla ya kuingiza taarifa zako."
    },
    {
      icon: Globe,
      title: "Usalama wa Kuvinjari (Browsing)",
      color: "bg-orange-100 text-orange-600",
      content: "Hakikisha tovuti unayotumia ina 'https://' mwanzoni mwa anwani yake. Hii inaashiria kuwa mawasiliano kati yako na tovuti hiyo yamesimbwa (encrypted) na ni salama."
    },
    {
      icon: Smartphone,
      title: "Sasisha Vifaa Vyako",
      color: "bg-teal-100 text-teal-600",
      content: "Daima sasisha (update) programu zako na mfumo wa uendeshaji wa simu au kompyuta yako. Masasisho haya mara nyingi huziba mianya ya usalama ambayo wadukuzi wanaweza kutumia."
    }
  ];

  return (
    <div className="pb-24 pt-8 px-5 max-w-md mx-auto min-h-screen bg-slate-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Ushauri wa Usalama</h1>
        <p className="text-slate-500 text-sm mt-1">Vidokezo muhimu vya usalama mtandaoni.</p>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${tip.color}`}>
                <tip.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advice;