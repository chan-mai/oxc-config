import type { Config } from "./config"
import { helper } from "./helper"
import { readFileSync } from "node:fs"
import { parent } from "../parent"
import { store } from "~/stores/main"
import { z } from "zod"
import { util } from "@/utils"
import "./style.css"

export const double = (x: number) => x * 2

export const names = (users: { name: string }[]) => users.map((user) => user.name)

export function load(path: string): Config {
    const text = readFileSync(path, "utf8")
    return { text, value: helper(parent(store(util(z)))) } as unknown as Config
}
