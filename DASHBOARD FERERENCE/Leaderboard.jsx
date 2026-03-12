import React from "react";
import Icon from "components/AppIcon";
import Image from "components/AppImage";

const leaders = [
    {
        rank: 1,
        name: "Sarah Mitchell",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e78d8163-1772092092509.png",
        avatarAlt: "Professional woman with brown hair smiling in outdoor setting with green background",
        points: 4820,
        trees: 142,
        badge: "🌳 Forest Guardian",
        badgeColor: "var(--color-success)"
    },
    {
        rank: 2,
        name: "James Okafor",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12ab9ea78-1763296173898.png",
        avatarAlt: "Young African man with short hair wearing casual blue shirt outdoors",
        points: 3960,
        trees: 118,
        badge: "🌿 Eco Champion",
        badgeColor: "var(--color-primary)"
    },
    {
        rank: 3,
        name: "Priya Sharma",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe9b5695-1763296011297.png",
        avatarAlt: "Indian woman with long dark hair wearing professional attire in office environment",
        points: 3410,
        trees: 97,
        badge: "🍃 Green Warrior",
        badgeColor: "var(--color-secondary)"
    },
    {
        rank: 4,
        name: "Carlos Rivera",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17e47b494-1772785318868.png",
        avatarAlt: "Hispanic man with beard wearing green jacket standing in park with trees",
        points: 2890,
        trees: 84,
        badge: "🌱 Planter",
        badgeColor: "var(--color-accent)"
    },
    {
        rank: 5,
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1713746834138-e4b5249786b9",
        avatarAlt: "Blonde woman with glasses smiling in natural outdoor setting with sunlight",
        points: 2340,
        trees: 71,
        badge: "🌱 Planter",
        badgeColor: "var(--color-accent)"
    }];


const rankColors = ["#E8B86D", "#9CA3AF", "#CD7F32"];

export default function Leaderboard() {
    return (
        <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-heading font-semibold text-foreground">Top Contributors</h3>
                    <p className="text-xs text-muted-foreground font-caption">This month's leaderboard</p>
                </div>
                <Icon name="Trophy" size={18} color="var(--color-accent)" />
            </div>
            <div className="space-y-2.5">
                {leaders?.map((leader) =>
                    <div key={leader?.rank} className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 ${leader?.rank === 1 ? "bg-accent/8 border border-accent/20" : "hover:bg-muted/50"}`}>
                        <div className="w-6 flex-shrink-0 text-center">
                            {leader?.rank <= 3 ?
                                <Icon name="Medal" size={16} color={rankColors?.[leader?.rank - 1]} /> :

                                <span className="text-xs font-data font-bold text-muted-foreground">{leader?.rank}</span>
                            }
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={leader?.avatar} alt={leader?.avatarAlt} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-caption font-semibold text-foreground truncate">{leader?.name}</p>
                            <p className="text-xs text-muted-foreground font-caption">{leader?.badge}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-sm font-data font-bold text-primary">{leader?.points?.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground font-caption">{leader?.trees} trees</p>
                        </div>
                    </div>
                )}
            </div>
        </div>);

}