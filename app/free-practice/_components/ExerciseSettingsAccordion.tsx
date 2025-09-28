import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {cn} from "@/lib/utils/cn";
import {Checkbox} from "@/components/ui/checkbox";
import type {Category, ExerciseCategory} from "@/app/types";
import {useEffect, useMemo, useState} from "react";
import {INTERVALS_DATA} from "@/lib/constants/intervalsData";
import {CHORDS_DATA} from "@/lib/constants/chordsData";
import {SCALES_DATA} from "@/lib/constants/scalesData";
import {Button} from "@/components/ui/button";

function getElementOptions(category: ExerciseCategory) {
    switch (category) {
        case "intervals":
            return INTERVALS_DATA;
        case "chords":
            return CHORDS_DATA;
        case "scales":
            return SCALES_DATA;
        default:
            return INTERVALS_DATA;
    }
}

type ExerciseSettingsAccordionProps = {
    category: Category
}

export default function ExerciseSettingsAccordion({category}: ExerciseSettingsAccordionProps){
    const answerOptions = getElementOptions(category.slug as ExerciseCategory)
    const [selectedElements, setSelectedElements] = useState<string[]>([])

    const groups = useMemo(() => {
        if (!answerOptions || answerOptions.length === 0) return [];
        return Object.groupBy(answerOptions, (option) => option.category);
    }, [answerOptions]);

    function onCheckedChange(checked: boolean, symbol: string){
        if(checked){
            setSelectedElements(prev => [...prev, symbol])
            return
        }

        setSelectedElements(prev => [...prev].filter(s => s !== symbol))
    }

    function onSave(){
        console.log(selectedElements)
    }

    return (
        <Accordion type='multiple'>
            <AccordionItem value='settings'>
                <AccordionTrigger className='text-xl font-bold hover:underline-none'>
                    Settings
                </AccordionTrigger>
                <AccordionContent>
                    {groups && Object.entries(groups).map(([group, options]) => {
                        return (
                            <div key={group}>
                                <hr className='my-5'/>
                                <h4 className='uppercase font-bold text-xs text-muted-foreground mb-2'>{group}</h4>
                                <div className='grid grid-cols-4 gap-3'>
                                    {options?.map((option) => (
                                        <label htmlFor={option.symbol} key={option.symbol}  className={cn([
                                            "text-left flex justify-start gap-3 border rounded-md py-2 px-3 items-center ",
                                        ])}>
                                            <Checkbox checked={selectedElements.some(s => s===option.symbol)} onCheckedChange={(checked) => onCheckedChange(!!checked, option.symbol)} id={option.symbol} className='peer bg-primary-foreground'/>
                                            <span className='mr-auto'>
                                                    {option.symbol}
                                                    </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                    <Button onClick={onSave} className='mt-5'>Save</Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}