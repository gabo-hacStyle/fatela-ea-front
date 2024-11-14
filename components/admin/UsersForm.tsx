"use client";
import React, { useState, useEffect } from "react";

//internacionalizacion
import { useTranslations } from "next-intl";

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
// import Loading from "./Loading"

import { defaultValuesUserForm, roles, rolesEdit } from "@/utils/index";
// import { useRouter } from 'next/navigation';
// import { postLogin } from '@/services/backend/auth';

//Actions
import {
  handleCreateAdmin,
  handleCreateUser,
  handleUpdateUser,
} from "@/actions/userActions";
import { Country, User } from "@/index";

const userSchema = z.object({
  // username: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
  // user_name: z.string({ required_error: "El campo 'email' no puede estar vacío." }),
  email: z.string().email({
    message: "El campo 'email' debe ser un correo electrónico válido.",
  }),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    ,
  name: z.string(),
  enabled: z.boolean(),
  countryId: z.string(),
  roles: z.array(z.string()),
});

interface UsersFormProps {
  usage: "add" | "addAdmin" | "edit";
  user: User | null;
  countries: Country[];
}
const UsersForm = ({ usage, user, countries }: UsersFormProps) => {
  const t = useTranslations("FormSection");
  const u = useTranslations("AdminPage");

const userId = usage === "edit" ? user?.userId : 0;
  console.log('Id del usuario', userId)
  const defaultValues =
    user && usage === "edit"
      ? {
          email: user.email,
          name: user.name,
          enabled: user.enabled,
          countryId: String(user.country.countryId),
          roles: user.roles,
        }
      : defaultValuesUserForm;

  //Defining the form
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });
  const [error, setErrorForm] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  //Submit function
  async function onSubmit(data: z.infer<typeof userSchema>) {
    console.log('Hola ??')
    const { email, name, enabled, countryId, roles, password } = data;
    console.log(enabled);
    const backendValuesAdd = {
        email,
        name,
        enabled,
        countryId: Number(countryId),
        roles,
        password,
    }
    const backendValuesEdit = {
        userId: user?.userId || 0,
        userDto: {
            email,
            name,
            enabled,
            countryId: Number(countryId),
            roles,
        }
    }
    const backendvaluesCreateAdmin = {
        email,
        name,
        enabled,
        countryId: Number(countryId),
        password,
    }
   
    setDisabled(true);
    setLoading(true);
    setErrorForm("");
    let response;
    if (usage === "add") {
      response = await handleCreateUser(backendValuesAdd);
    } else if (usage === "addAdmin") {
      response = await handleCreateAdmin(backendvaluesCreateAdmin);
    } else if (usage === "edit") {
        
      response = await handleUpdateUser(backendValuesEdit);
    }
    if (response) {
      console.log(response)
    } else {
      setErrorForm("Error al crear usuario");
      setLoading(false);
    }
    setDisabled(false);
  }
    
  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full mt-6">
                  <FormLabel>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="staff@fatela.org"
                      onFocus={() => setErrorForm("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full mt-6">
                  <FormLabel>{t("nameLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nombre de usuario"
                      onFocus={() => setErrorForm("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="w-full mt-6 flex items-center gap-3">
                  <FormLabel>{t("enabledLabel")}</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {usage === "add" && (
            <>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full mt-6">
                      <FormLabel> {t("passwrodLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder=""
                          onFocus={() => setErrorForm("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
              <FormLabel> {t("rolesLabel")}</FormLabel>
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <>
                    {roles.map((item) => (
                      <FormItem key={item.value} className="w-full mt-6 flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    item.value,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label === "staff"
                            ? u("staff")
                            : item.label === "coordinator"
                              ? u("coor")
                              : u("admin")}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </>
                )}
              />
            </div>
            </>
          )}
          {usage === "addAdmin" && (
            <div className="mb-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full mt-6">
                    <FormLabel> {t("passwrodLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder=""
                        onFocus={() => setErrorForm("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {usage === "edit" && (
            <div className="mb-6">
              <FormLabel> {t("rolesLabel")}</FormLabel>
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <>
                    {rolesEdit.map((item) => (
                      <FormItem key={item.value} className="w-full flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    `${item.value}`,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label === "staff"
                            ? u("staff")
                            : item.label === "coordinator"
                              ? u("coor")
                              : u("admin")}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </>
                )}
              />
            </div>
          )}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem className="w-full mt-6">
                  <FormLabel>{t("countryLabel")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pais" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.countryId} value={String(country.countryId)}>
                                {country.countryName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                   
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={disabled}>
            {t("submit")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UsersForm;
