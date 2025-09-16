"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
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
import { toast } from "sonner";

const formSchema = z.object({
  district: z.enum(["Angul", "Balasore", "Bolangir"], {
    error: "District is required",
  }),
  crop: z.enum(["Paddy", "Wheat", "Maize", "Pulses", "Oilseeds"], {
    error: "Crop is required",
  }),
  sow_date: z.date({ error: "Invalid date format" }),
  season: z.enum(["Kharif", "Rabi", "Summer"], {
    error: "Season is required"
  }),
});

export default function CropPredictionForm() {
  const [formData, setFormData] = useState({
    district: "",
    cropType: "",
    sowingDate: "",
    season: "",
  });

  const [results, setResults] = useState<null | {
    predictedYield: string;
    irrigation: string;
    fertilizer: string;
    pestAlert: string;
  }>(null);

  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) router.push("/Login-Form");
    else setUsername(storedName);

    // Snake cursor
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    if (!username) {
      alert("Please login first!");
      router.push("/Login-Form");
      return;
    }

    const sampleData = {
      predictedYield: "3.5 tons/hectare",
      irrigation: "Water daily in the morning",
      fertilizer: "Apply NPK 20-20-20 once a week",
      pestAlert: "No major pests detected",
    };

    const formatedDate = format(data.sow_date,"yyyy-MM-dd");

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,{
      district: data.district,
      crop: data.crop,
      season: data.season,
      sowing_date: formatedDate
    }).then((resp) => {
      console.log(resp.data);
    }).catch((err) => {
      if(err.response) {
        // console.log(err.response.data.detail);
        toast.error(err.response.data.detail, {
          position: "bottom-center"
        });
      }
      else {
        toast.error(err.message);
      }
    });
    setResults(sampleData);

    // await new Promise((r) => setTimeout(r, 1000));
    // const newData = {...data, sow_date: formatedDate}
  };

  if (!username) return null;

  return (
    <div className={styles.pageContainer}>
      <div id="snake-container" className={styles.snakeContainer}></div>

      <div className={styles.formContainer}>
        <h2 className={styles.formHeading}>
          👋 Welcome, {username}! Predict your crop yield.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                        <SelectItem value="Angul">Angul</SelectItem>
                        <SelectItem value="Bolangir">Bolangir</SelectItem>
                        <SelectItem value="Balasore">Balasore</SelectItem>
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
                        <SelectLabel>Districts</SelectLabel>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Paddy">Paddy</SelectItem>
                        <SelectItem value="Maize">Maize</SelectItem>
                        <SelectItem value="Pulses">Pulses</SelectItem>
                        <SelectItem value="Oilseeds">Oilseeds</SelectItem>
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
                        <SelectValue placeholder="Select a district" />
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
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

        {results && (
          <div className={styles.resultsContainer}>
            <h3 className={styles.resultsHeading}>🌟 Prediction Results</h3>
            <div className={styles.resultsGrid}>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Predicted Yield</p>
                <p className={styles.resultValue}>{results.predictedYield}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Irrigation</p>
                <p className={styles.resultValue}>{results.irrigation}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Fertilizer</p>
                <p className={styles.resultValue}>{results.fertilizer}</p>
              </div>
              <div className={styles.resultItem}>
                <p className={styles.resultLabel}>Pest Alert</p>
                <p className={styles.resultValue}>{results.pestAlert}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
