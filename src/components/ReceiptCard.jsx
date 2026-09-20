import React from "react";
import { useReceipts } from "../context/ReceiptContext";
import {
  Music2,
  MapPin,
  CalendarDays,
  Receipt,
  Clock3,
  Tag,
  ArrowUpRight,
} from "lucide-react";

export default function ReceiptCard({ receipt }) {
  const { setSelectedReceipt } = useReceipts();

  if (!receipt) return null;

  const category =
    receipt.category ||
    receipt.type ||
    "Other";

  const isMusic =
    category === "Music" ||
    receipt.artist ||
    receipt.artist_name ||
    receipt.track ||
    receipt.track_name;

  const title =
    receipt.merchant ||
    receipt.title ||
    receipt.track ||
    receipt.track_name ||
    receipt.artist ||
    "Life Moment";

  const artist =
    receipt.artist ||
    receipt.artist_name ||
    "";

  const track =
    receipt.track ||
    receipt.track_name ||
    "";

  const location =
    receipt.location ||
    receipt.city ||
    receipt.state ||
    "";

  const date = receipt.date
    ? new Date(receipt.date)
    : null;

  const validDate =
    date && !isNaN(date.getTime());

  const formattedDate = validDate
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  const time = validDate
    ? date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const amount = Number(
    receipt.total ??
      receipt.amount ??
      receipt.amt ??
      0
  );

  const duration =
    receipt.durationMinutes ??
    receipt.duration_minutes ??
    receipt.minutes ??
    null;

  const trackCount =
    receipt.trackCount ??
    receipt.track_count ??
    receipt.tracks ??
    null;

  const notes =
    receipt.notes ||
    receipt.note ||
    receipt.description ||
    "";

  const tags = Array.isArray(receipt.tags)
    ? receipt.tags
    : [];

  const items = Array.isArray(receipt.items)
    ? receipt.items
    : [];

  // Category-specific accent
  const accent = isMusic
    ? {
        border: "hover:border-pink-500/40",
        icon: "text-pink-400",
        badge:
          "bg-pink-500/10 text-pink-300 border-pink-500/20",
      }
    : category
        .toLowerCase()
        .includes("food")
      ? {
          border: "hover:border-orange-500/40",
          icon: "text-orange-400",
          badge:
            "bg-orange-500/10 text-orange-300 border-orange-500/20",
        }
      : {
          border: "hover:border-amber-500/40",
          icon: "text-amber-400",
          badge:
            "bg-amber-500/10 text-amber-300 border-amber-500/20",
        };

  return (
    <article
      onClick={() =>
        setSelectedReceipt(receipt)
      }
      className={`
        group relative
        min-h-[220px]
        rounded-2xl
        overflow-hidden
        cursor-pointer
        bg-gradient-to-br
        from-stone-900
        via-stone-900
        to-[#111014]
        border border-stone-800
        ${accent.border}
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      `}
    >

      {/* Decorative receipt perforation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent" />

      {/* Glow */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-all" />

      <div className="relative p-5">

        {/* -------------------------------- */}
        {/* TOP ROW */}
        {/* -------------------------------- */}

        <div className="flex items-start justify-between gap-3 mb-4">

          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center">

              {isMusic ? (
                <Music2
                  className={`w-4 h-4 ${accent.icon}`}
                />
              ) : (
                <Receipt
                  className={`w-4 h-4 ${accent.icon}`}
                />
              )}

            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
                Memory Artifact
              </div>

              <div
                className={`
                  inline-flex mt-1 px-2 py-0.5
                  rounded-full border
                  text-[9px] uppercase
                  tracking-wider font-mono
                  ${accent.badge}
                `}
              >
                {category}
              </div>
            </div>

          </div>

          <ArrowUpRight
            className="
              w-4 h-4
              text-stone-600
              group-hover:text-amber-400
              transition-colors
            "
          />

        </div>


        {/* -------------------------------- */}
        {/* DATE */}
        {/* -------------------------------- */}

        <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-2">

          <CalendarDays className="w-3.5 h-3.5" />

          <span>
            {formattedDate}
          </span>

          {time && (
            <>
              <span className="text-stone-700">
                •
              </span>

              <Clock3 className="w-3 h-3" />

              <span>
                {time}
              </span>
            </>
          )}

        </div>


        {/* -------------------------------- */}
        {/* TITLE */}
        {/* -------------------------------- */}

        <h3
          className="
            font-serif
            text-xl
            text-stone-100
            leading-tight
            line-clamp-2
            group-hover:text-amber-200
            transition-colors
          "
        >
          {title}
        </h3>


        {/* -------------------------------- */}
        {/* MUSIC DETAILS */}
        {/* -------------------------------- */}

        {isMusic && (
          <div className="mt-2 space-y-1">

            {artist && (
              <div className="text-sm text-stone-300 font-medium">
                {artist}
              </div>
            )}

            {track &&
              track !== title && (
                <div className="text-xs text-stone-500 line-clamp-1">
                  {track}
                </div>
              )}

          </div>
        )}


        {/* -------------------------------- */}
        {/* LOCATION */}
        {/* -------------------------------- */}

        {location && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-stone-500">

            <MapPin className="w-3.5 h-3.5 text-rose-400" />

            <span className="truncate">
              {location}
            </span>

          </div>
        )}


        {/* -------------------------------- */}
        {/* MUSIC STATS */}
        {/* -------------------------------- */}

        {(trackCount !== null ||
          duration !== null) && (

          <div className="flex items-center gap-2 mt-3">

            {trackCount !== null && (
              <span className="px-2 py-1 rounded-lg bg-stone-950 border border-stone-800 text-[10px] font-mono text-stone-400">
                {trackCount} tracks
              </span>
            )}

            {duration !== null && (
              <span className="px-2 py-1 rounded-lg bg-stone-950 border border-stone-800 text-[10px] font-mono text-stone-400">
                {duration} min
              </span>
            )}

          </div>
        )}


        {/* -------------------------------- */}
        {/* ITEMS */}
        {/* -------------------------------- */}

        {!isMusic &&
          items.length > 0 && (

            <div className="mt-3 space-y-1">

              {items
                .slice(0, 2)
                .map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      justify-between
                      text-xs
                      font-mono
                      text-stone-400
                    "
                  >

                    <span className="truncate">
                      {item?.quantity
                        ? `${item.quantity}× `
                        : ""}
                      {item?.name ||
                        item?.title ||
                        "Item"}
                    </span>

                  </div>

                ))}

            </div>
          )}


        {/* -------------------------------- */}
        {/* NOTES */}
        {/* -------------------------------- */}

        {notes && (
          <p
            className="
              mt-3
              text-xs
              text-stone-500
              italic
              font-serif
              line-clamp-2
            "
          >
            "{String(notes).slice(0, 90)}
            {String(notes).length > 90
              ? "..."
              : ""}
            "
          </p>
        )}


        {/* -------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------- */}

        <div
          className="
            mt-5
            pt-3
            border-t
            border-dashed
            border-stone-800
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-2">

            {tags.length > 0 ? (
              <>
                <Tag className="w-3 h-3 text-stone-600" />

                <span className="text-[9px] font-mono text-stone-600">
                  #{tags[0]}
                </span>
              </>
            ) : (
              <span className="text-[9px] font-mono text-stone-600 uppercase tracking-wider">
                Recorded memory
              </span>
            )}

          </div>


          {amount > 0 && (
            <span className="font-mono text-sm font-bold text-amber-300">
              ₹{amount.toFixed(2)}
            </span>
          )}

        </div>

      </div>

      {/* Bottom receipt edge */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-1
          opacity-0
          group-hover:opacity-100
          bg-gradient-to-r
          from-transparent
          via-amber-500/60
          to-transparent
          transition-opacity
        "
      />

    </article>
  );
}