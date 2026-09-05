"use client";
import { useMutation } from "@tanstack/react-query";
import { oilApi } from "../api/client";
import { ScenarioParams, ScenarioData } from "../types";

export function useScenario() {
  return useMutation({ mutationFn: (params: ScenarioParams) => oilApi.runScenario(params) });
}
