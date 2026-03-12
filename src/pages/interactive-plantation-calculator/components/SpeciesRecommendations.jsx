import React from "react";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";
import Image from "components/AppImage";

const SPECIES_DATA = {
  loamy: {
    primary: [
    {
      name: "Peepal (Ficus religiosa)",
      benefit: "AQI Improvement",
      co2: "21.7 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1c7ab33-1773080880035.png",
      imageAlt: "Large ancient Peepal tree with wide spreading canopy and aerial roots in Indian village setting",
      spacing: "8–10 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    },
    {
      name: "Neem (Azadirachta indica)",
      benefit: "Air Purification",
      co2: "18.3 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_19becf07f-1773080879481.png",
      imageAlt: "Neem tree with dense green foliage and small white flowers in tropical Indian landscape",
      spacing: "6–8 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    }],

    secondary: [
    {
      name: "Mango (Mangifera indica)",
      benefit: "Fruit + Shade",
      co2: "15.1 kg/yr",
      image: "https://images.unsplash.com/photo-1703729027853-dfd994ab84b8",
      imageAlt: "Mango tree with lush green leaves and clusters of ripe yellow mangoes hanging from branches",
      spacing: "10–12 m",
      maintenance: "Medium",
      tag: "Secondary",
      tagColor: "var(--color-secondary)"
    }]

  },
  black: {
    primary: [
    {
      name: "Teak (Tectona grandis)",
      benefit: "Timber + Carbon",
      co2: "22.5 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1afa2d452-1773080879810.png",
      imageAlt: "Tall teak trees with large broad leaves forming dense forest canopy in tropical woodland",
      spacing: "5–7 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    },
    {
      name: "Bamboo (Bambusa vulgaris)",
      benefit: "Fast Growth + CO₂",
      co2: "35.0 kg/yr",
      image: "https://images.unsplash.com/photo-1620653142452-e870377454a9",
      imageAlt: "Dense bamboo grove with tall green stalks and feathery leaves in natural forest environment",
      spacing: "3–4 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    }],

    secondary: [
    {
      name: "Subabul (Leucaena leucocephala)",
      benefit: "Nitrogen Fixation",
      co2: "12.8 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_106a0901e-1773080880483.png",
      imageAlt: "Subabul tree with feathery compound leaves and white flower clusters in open field setting",
      spacing: "4–5 m",
      maintenance: "Very Low",
      tag: "Secondary",
      tagColor: "var(--color-secondary)"
    }]

  },
  clay: {
    primary: [
    {
      name: "Jamun (Syzygium cumini)",
      benefit: "Waterlogging Tolerant",
      co2: "16.4 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc393eaf-1773080880940.png",
      imageAlt: "Jamun tree with dark green glossy leaves and clusters of purple-black berries in Indian orchard",
      spacing: "7–9 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    },
    {
      name: "Arjun (Terminalia arjuna)",
      benefit: "Riverbank Stabilizer",
      co2: "19.2 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1137fea-1773080878972.png",
      imageAlt: "Arjun tree with spreading branches and oval leaves growing near riverbank",
      spacing: "8–10 m",
      maintenance: "Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    }],

    secondary: [
    {
      name: "Karanj (Pongamia pinnata)",
      benefit: "Biofuel + Shade",
      co2: "14.7 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ac597fb-1773080882218.png",
      imageAlt: "Karanj tree with compound leaves and pink-purple flower clusters in roadside plantation",
      spacing: "6–8 m",
      maintenance: "Very Low",
      tag: "Secondary",
      tagColor: "var(--color-secondary)"
    }]

  },
  sandy: {
    primary: [
    {
      name: "Casuarina (Casuarina equisetifolia)",
      benefit: "Saline Sandy Soil",
      co2: "20.1 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3ed5990-1773080881352.png",
      imageAlt: "Casuarina trees with needle-like foliage growing in coastal sandy soil near shoreline",
      spacing: "3–5 m",
      maintenance: "Very Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    },
    {
      name: "Prosopis (Prosopis juliflora)",
      benefit: "Drought Resistant",
      co2: "11.3 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_112af07e8-1773080885399.png",
      imageAlt: "Prosopis tree with thorny branches and feathery leaves growing in arid dry sandy landscape",
      spacing: "4–6 m",
      maintenance: "Very Low",
      tag: "Primary",
      tagColor: "var(--color-primary)"
    }],

    secondary: [
    {
      name: "Babul (Acacia nilotica)",
      benefit: "Soil Binding",
      co2: "10.5 kg/yr",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17a61ef89-1773080880521.png",
      imageAlt: "Babul acacia tree with thorny branches and yellow ball-shaped flowers in dry Indian savanna",
      spacing: "5–7 m",
      maintenance: "Low",
      tag: "Secondary",
      tagColor: "var(--color-secondary)"
    }]

  }
};

const SpeciesCard = ({ species, index }) =>
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.08 }}
  className="rounded-xl overflow-hidden border flex flex-col"
  style={{ background: "var(--color-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
  
    <div className="relative h-32 overflow-hidden">
      <Image
      src={species?.image}
      alt={species?.imageAlt}
      className="w-full h-full object-cover" />
    
      <span
      className="absolute top-2 left-2 px-2 py-0.5 rounded-full font-caption font-semibold text-xs"
      style={{ background: species?.tagColor, color: "#fff", fontSize: "0.7rem" }}>
      
        {species?.tag}
      </span>
    </div>
    <div className="p-3 flex flex-col gap-2 flex-1">
      <div>
        <p className="font-heading font-semibold text-sm leading-tight" style={{ color: "var(--color-foreground)" }}>
          {species?.name}
        </p>
        <p className="font-caption text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
          {species?.benefit}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-auto">
        {[
      { icon: "Wind", val: species?.co2, label: "CO₂" },
      { icon: "Ruler", val: species?.spacing, label: "Spacing" },
      { icon: "Wrench", val: species?.maintenance, label: "Care" }]?.
      map((item) =>
      <div key={item?.label} className="flex flex-col items-center rounded-lg p-1.5" style={{ background: "var(--color-muted)" }}>
            <Icon name={item?.icon} size={12} color="var(--color-primary)" />
            <span className="font-data text-xs font-semibold mt-0.5 text-center leading-tight" style={{ color: "var(--color-foreground)", fontSize: "0.65rem" }}>
              {item?.val}
            </span>
            <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.6rem" }}>
              {item?.label}
            </span>
          </div>
      )}
      </div>
    </div>
  </motion.div>;


export default function SpeciesRecommendations({ soilType }) {
  if (!soilType) return null;

  const data = SPECIES_DATA?.[soilType];
  if (!data) return null;

  const allSpecies = [...data?.primary, ...data?.secondary];
  const soilLabel = { loamy: "Loamy", black: "Black (Regur)", clay: "Clay", sandy: "Sandy" }?.[soilType] || soilType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border p-6 md:p-8"
      style={{
        background: "var(--color-card)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-md)"
      }}>
      
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: "rgba(139,69,19,0.12)" }}>
          
          <Icon name="Sprout" size={22} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg" style={{ color: "var(--color-foreground)" }}>
            Species Recommendations
          </h2>
          <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            Optimal species for {soilLabel} soil
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-3">
        {allSpecies?.map((sp, i) =>
        <SpeciesCard key={sp?.name} species={sp} index={i} />
        )}
      </div>
      <div
        className="mt-5 rounded-xl p-4 flex items-start gap-3"
        style={{ background: "rgba(139,69,19,0.07)", border: "1px solid rgba(139,69,19,0.15)" }}>
        
        <Icon name="BookOpen" size={16} color="var(--color-secondary)" className="flex-shrink-0 mt-0.5" />
        <p className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Species selection is based on Environmental Authority guidelines and ICAR soil suitability data. Primary species are recommended for &gt;70% of plantation area; secondary species for remaining 30% to ensure biodiversity.
        </p>
      </div>
    </motion.div>);

}