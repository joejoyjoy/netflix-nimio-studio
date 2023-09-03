import Image from "next/image";

interface Props {
  name: string;
  born: number;
  bio: string;
}

export default function PersonCard({ data }: { data: Props }) {
  const { name, born, bio } = data;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-48 md:w-32 sm:w-32 aspect-[5/4] bg-slate-2 overflow-hidden rounded-md">
        <Image
          src={"/assets/IMG/placeholder-profile-sq.webp"}
          alt={name}
          className="object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
          priority
        />
      </div>
      <div className="w-48 md:w-32 sm:w-32 p-2 bg-slate-7 rounded-md border border-slate-2">
        <p className="text-white font-normal line-clamp-1">{name}</p>
        <p className="text-white font-light">{born}</p>
      </div>
    </div>
  );
}
