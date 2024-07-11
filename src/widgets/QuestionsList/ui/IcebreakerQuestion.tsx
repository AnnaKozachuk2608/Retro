"use client";

import { useApiMutation } from "@/entities/mutation/use-api-mutation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Check, Lightbulb, Loader2 } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Button } from "@/shared/ui/button";

interface IcebreakerQuestionProps {
  roomId: string;
  icebreakerQuestionContent: string;
}

export default function IcebreakerQuestion({
  roomId,
  icebreakerQuestionContent,
}: IcebreakerQuestionProps) {

  const [icebreakerValue, setIcebreakerValue] = useState<any>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isSavedicebreaker, setIsSavedicebreaker] = useState(false);

  const { mutate, pending } = useApiMutation(
    api.rooms.createIcebreakerQuestion
  );

  const getIcebreaker = useQuery(api.questiontemplates.getIcebreaker);

  function onSaveicebreaker(e: any) {
    setIcebreakerValue(e);
   
    mutate({
      roomId: roomId as Id<"Rooms">, 
      icebreakerQuestionContent: e, 
    });
    setIsSavedicebreaker(true);
    setShowSuggestions(false);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Do you want to add an Icebreaker question?</CardTitle>
        <CardDescription>Write it here or add from database</CardDescription>
      </CardHeader>
      <CardContent className="relative flex gap-2">
        <Input
          value={icebreakerValue}
          className={`${isSavedicebreaker && icebreakerValue === icebreakerQuestionContent && "border-emerald-400"}`}
          onBlur={(e) => onSaveicebreaker(e.target.value)}
          onChange={(e) => setIcebreakerValue(e.target.value)}
        />
        {isSavedicebreaker && icebreakerValue === icebreakerQuestionContent && (
          <div className="absolute text-sm flex justify-center items-center top-3 right-20">
            <Check className="w-4 h-4 text-green-600" />
          </div>
        )}
        <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
          <PopoverTrigger asChild>
            <Button
              className="border border-yellow-400"
              variant="outline"
              role="combobox"
              size="icon"
              aria-expanded={showSuggestions}
            >
              {<Lightbulb className="w-5 h-5" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[490px] absolute -right-6">
            <Command>
              <CommandInput placeholder="Search question..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {!getIcebreaker ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    getIcebreaker.map((question, index) => (
                      <CommandItem
                        key={question.content}
                        value={question.content}
                        onSelect={(currentValue) => {
                          onSaveicebreaker(currentValue);
                          setShowSuggestions(false);
                        }}
                      >
                        {index + 1}.- {question.content}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
