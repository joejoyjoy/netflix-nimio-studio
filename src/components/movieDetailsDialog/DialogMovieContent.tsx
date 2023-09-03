import React from "react";
import Image from "next/image";
import { downScaleImage } from "@/utils/downScaleImage";
import { minutesToHours } from "@/utils/minutesToHours";
import { categoriesToString } from "@/utils/categoriesToString";

export default function DialogMovieContent({
  data,
}: {
  data: MovieIncludeCategory;
}) {
  const { name, cover, overview, year, duration, categories } = data;

  return (
    <div className="p-8 w-full max-h-[calc(100vh-66px)] overflow-y-auto overflow-hidden">
      <div className="grid grid-cols-[auto,1fr] gap-4">
        <div className="relative  w-48 aspect-[3/4] bg-slate-2 overflow-hidden rounded-sm">
          <Image
            src={downScaleImage(cover.secure_url)}
            alt={name}
            className="object-cover"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <div>
            <p>Name</p>
            <h3 className="text-lg text-white line-clamp-1">{name}</h3>
          </div>
          <div>
            <p>Overview</p>
            <h3 className="text-sm text-white font-light line-clamp-4">
              {overview}
            </h3>
          </div>
          <div className="flex gap-8">
            <span>
              <p>Year</p>
              <h3 className="text-lg text-white font-normal">{year}</h3>
            </span>
            <span>
              <p>Duration</p>
              <h3 className="text-lg text-white font-normal">
                {minutesToHours(duration)}
              </h3>
            </span>
            <span>
              <p>Category</p>
              <h3 className="text-lg text-white font-normal line-clamp-1">
                {categoriesToString(categories)}
              </h3>
            </span>
          </div>
        </div>
      </div>
      <h3>
        {data.name} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aperiam temporibus non nam earum amet, eum et atque culpa magni, ullam
        maxime? Maxime tempore veritatis totam quisquam temporibus ducimus error
        animi. Voluptatibus labore accusamus quas distinctio. Consectetur ab
        voluptatum recusandae magnam, culpa temporibus laboriosam, explicabo
        quisquam distinctio officia natus libero, facere animi voluptatibus
        nulla aperiam enim sapiente id. Laudantium, in accusamus? Repellendus
        eius quam suscipit possimus eos vitae quidem, saepe veritatis accusamus
        quae, debitis hic? Odio dolorem, ad sequi nemo pariatur, facilis dicta
        numquam corrupti quasi dolor dolore corporis maxime error. Quasi commodi
        dolores, similique expedita nulla velit voluptatem officia deserunt
        itaque tenetur quisquam repudiandae dolor illo cupiditate veniam.
        Corrupti quo aperiam, excepturi tempore vero modi possimus dolorum
        reiciendis officiis architecto! Magni, facere ab veniam non iure,
        doloremque harum voluptatem nihil porro odit, iusto quasi ad a fugiat
        illum laudantium omnis! Delectus dolorum debitis tempora tenetur
        mollitia dignissimos veniam, sapiente atque. Ullam officiis quod
        consequatur minus fuga ut at optio, animi ipsa possimus quas
        consectetur, temporibus ratione aliquid rerum recusandae illum atque.
        Impedit nihil, nesciunt architecto autem perspiciatis recusandae
        laboriosam maiores. Aspernatur earum sed, quos vel tempora est ex
        consequuntur nulla atque unde? Asperiores autem dolore dicta quasi sequi
        necessitatibus, quae sint, nihil voluptatem ipsam quisquam libero,
        aperiam sed ad obcaecati! Earum exercitationem ut, vitae illum quia
        veniam ipsum ea hic. Nulla numquam temporibus vel libero accusamus
        repellat eveniet eligendi corrupti minus voluptatem debitis eius non
        dolorem modi, facere aliquid ducimus? A illum quisquam necessitatibus.
        Sapiente, facere distinctio dolor ab nulla qui. Saepe, nobis dignissimos
        corrupti neque quidem laudantium recusandae facilis, omnis nam dolore
        nisi ad laborum aliquam quae facere a! Vitae architecto repellat quasi
        saepe nihil commodi, consectetur non reiciendis est nesciunt totam autem
        ullam impedit doloribus praesentium ducimus qui laborum modi, cumque
        natus. Sint omnis laboriosam perferendis molestiae doloribus?
      </h3>
    </div>
  );
}