"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./CropPredictionForm.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { districts } from "@/constants/districts";
import { crops } from "@/constants/crops";

export const formSchema = z.object({
  district: z.enum(districts, {
    error: "District is required",
  }),
  crop: z.enum(crops, {
    error: "Crop is required",
  }),
  sow_date: z.date({ error: "Invalid date format" }),
  season: z.enum(["Kharif", "Rabi", "Summer"], {
    error: "Season is required"
  }),
});

interface CropPredictionFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
}

export default function CropPredictionForm({ onSubmit }: CropPredictionFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const snakeContainer = document.getElementById("snake-container");
    const dots: { el: HTMLDivElement; x: number; y: number }[] = [];
    const dotCount = 15;
    const delay = 6;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add(styles["snake-dot"]);
      snakeContainer?.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateSnake() {
      let x = mouseX;
      let y = mouseY;
      dots.forEach((dot, index) => {
        dot.x += (x - dot.x) * 0.3;
        dot.y += (y - dot.y) * 0.3;
        dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${
          1 - index * 0.05
        })`;
        dot.el.style.opacity = `${1 - index * 0.05}`;
        x = dot.x - delay;
        y = dot.y - delay;
      });
      requestAnimationFrame(animateSnake);
    }

    animateSnake();
  }, [router]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    onSubmit(data)
  };

  return (
    <div className={styles.pageContainer}>
      <div id="snake-container" className={styles.snakeContainer}></div>

      <div className={styles.formContainer}>
        <h2 className={styles.formHeading}>
          👋 Welcome! Predict your crop yield.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={styles.formGrid}
          >
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">District</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-6 rounded-3xl ring-green-300">
                        <SelectValue placeholder="Select a district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Districts</SelectLabel>
                        {districts.map((_,i) => (
                          <SelectItem value={_} key={i}>{_.toLowerCase()}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Crop</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-6 rounded-3xl ring-green-300">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Crops</SelectLabel>
                        {crops.map((_,i) => (
                          <SelectItem value={_} key={i}>{_}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Season</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-6 rounded-3xl ring-green-300">
                        <SelectValue placeholder="Select a season" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Districts</SelectLabel>
                        <SelectItem value="Kharif">Kharif</SelectItem>
                        <SelectItem value="Rabi">Rabi</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sow_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xl">Sowing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-transparent py-6 rounded-3xl",
                            !field.value && "text-muted"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className={styles.actionRow}>
            <button type="submit" className={styles.submitButton}>
              🚀 Get Prediction
            </button>
          </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
